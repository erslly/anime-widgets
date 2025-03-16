# 🪐 Thunder — Discord Presence API
Thunder is an assistant service that allows Discord users to export their data to the web and access it at any time through the web.

#### GET `/api/v1/users/:id`
```json
{
  "id": "string",
  "username": "string",
  "display_name": "string",
  "avatar": "string",
  "avatar_url": "string",
  "default_avatar": "string",
  "banner": "string | null",
  "banner_color": "string",
  "banner_url": "string | null",
  "flags": "number",
  "status": "import('discord.js').PresenceStatus",
  "activities": "import('discord.js').Activity[]",
  "platform": "import('discord.js').ClientPresenceStatusData",
}
```
