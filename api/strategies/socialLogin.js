const { logger } = require('@librechat/data-schemas');
const { createSocialUser, handleExistingUser } = require('./process');
const { isEnabled } = require('~/server/utils');
const { findUser } = require('~/models');

const socialLogin =
  (provider, getProfileDetails) => async (accessToken, refreshToken, idToken, profile, cb) => {
    console.log('##################### GOOGLE TOKENS: ##################', { accessToken, refreshToken }); // <--- Add this line
    try {
      const { email, id, avatarUrl, username, name, emailVerified } = getProfileDetails({
        idToken,
        profile,
      });

      const oldUser = await findUser({ email: email.trim() });
      const ALLOW_SOCIAL_REGISTRATION = isEnabled(process.env.ALLOW_SOCIAL_REGISTRATION);

      if (oldUser) {
        // Save Google tokens if provider is google
        if (provider === 'google') {
          await require('./process').updateUser(oldUser._id, {
            googleAccessToken: accessToken,
            googleRefreshToken: refreshToken,
          });
        }
        await handleExistingUser(oldUser, avatarUrl);
        return cb(null, oldUser);
      }

      if (ALLOW_SOCIAL_REGISTRATION) {
        const newUser = await createSocialUser({
          email,
          avatarUrl,
          provider,
          providerKey: `${provider}Id`,
          providerId: id,
          username,
          name,
          emailVerified,
          // Save Google tokens if provider is google
          ...(provider === 'google' && {
            googleAccessToken: accessToken,
            googleRefreshToken: refreshToken,
          }),
        });
        return cb(null, newUser);
      }
    } catch (err) {
      logger.error(`[${provider}Login]`, err);
      return cb(err);
    }
  };

module.exports = socialLogin;
