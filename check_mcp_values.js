#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Simple function to load .env file
function loadEnvFile() {
  try {
    const envPath = path.join(__dirname, '.env');
    const envContent = fs.readFileSync(envPath, 'utf8');
    const env = {};
    
    envContent.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=');
        if (key && valueParts.length > 0) {
          env[key] = valueParts.join('=');
        }
      }
    });
    
    return env;
  } catch (error) {
    return {};
  }
}

const env = loadEnvFile();

console.log('🔍 Checking MCP Configuration Values\n');

// Check API_TOKEN
console.log('📋 API_TOKEN:');
const apiToken = env.API_TOKEN;
if (apiToken) {
  console.log(`   ✅ Found: ${apiToken.substring(0, 10)}...${apiToken.substring(apiToken.length - 4)}`);
} else {
  console.log('   ❌ Not found in environment variables');
  console.log('   💡 Add API_TOKEN=your_token_here to your .env file');
}

console.log('\n📋 LIBRECHAT_USER_ID:');
console.log('   ℹ️  This is a template variable that gets replaced at runtime');
console.log('   ℹ️  Format: {{LIBRECHAT_USER_ID}}');
console.log('   ℹ️  Gets replaced with the actual user ID when making requests');

// Read librechat.yaml to show current configuration
console.log('\n📋 Current MCP Configuration in librechat.yaml:');
try {
  const configPath = path.join(__dirname, 'librechat.yaml');
  const config = fs.readFileSync(configPath, 'utf8');
  
  // Extract the googlesheets configuration
  const lines = config.split('\n');
  let inGooglesheets = false;
  
  for (const line of lines) {
    if (line.trim() === 'googlesheets:') {
      inGooglesheets = true;
      console.log('   googlesheets:');
      continue;
    }
    
    if (inGooglesheets) {
      const trimmed = line.trim();
      if (trimmed && !line.startsWith(' ')) {
        // We've moved to a different section
        break;
      }
      
      if (trimmed) {
        console.log(`   ${line}`);
      }
    }
  }
} catch (error) {
  console.log('   ❌ Could not read librechat.yaml file');
}

console.log('\n🔧 How to verify these values are working:');
console.log('   1. Start LibreChat server');
console.log('   2. Log in as a user');
console.log('   3. Check the server logs for MCP connection attempts');
console.log('   4. Look for lines containing "MCP" and your server name');

console.log('\n📝 Example of what the processed headers will look like:');
console.log('   Original:');
console.log('     X-User-ID: "{{LIBRECHAT_USER_ID}}"');
console.log('     Authorization: "Bearer ${API_TOKEN}"');
console.log('   Processed (for user with ID "user123"):');
console.log('     X-User-ID: "user123"');
console.log('     Authorization: "Bearer your_actual_token_here"');

console.log('\n💡 Tips:');
console.log('   • Make sure your MCP server is running at http://host.docker.internal:8000/mcp');
console.log('   • Check that API_TOKEN is set in your environment');
console.log('   • Verify your MCP server can handle the headers being sent');
console.log('   • Look for any authentication errors in your MCP server logs');

// Show all environment variables that might be relevant
console.log('\n🔍 Other relevant environment variables:');
const relevantVars = ['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET', 'GOOGLE_API_KEY'];
relevantVars.forEach(varName => {
  const value = env[varName];
  if (value) {
    console.log(`   ✅ ${varName}: ${value.substring(0, 10)}...${value.substring(value.length - 4)}`);
  } else {
    console.log(`   ❌ ${varName}: Not set`);
  }
}); 