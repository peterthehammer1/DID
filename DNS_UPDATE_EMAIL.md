# DNS Update Required for portthis.com - Vercel Integration

Hi Jody,

I need to update the DNS configuration for portthis.com to integrate our new dashboard with our existing API server.

## Current Setup
- API Server: 199.127.110.49 (stays the same)
- New Dashboard: Needs to point to Vercel

## DNS Changes Required

### 1. Main Domain (portthis.com)
```
Type: CNAME
Name: @ (or leave blank)
Value: cname.vercel-dns.com
```

### 2. Keep API on current server
```
Type: A
Name: api
Value: 199.127.110.49
```

## Result After Changes
- `https://portthis.com` → New dashboard (Vercel)
- `https://portthis.com/api/*` → Existing API (your server)

## Nginx Config Update Needed

```nginx
server {
    listen 443 ssl;
    server_name portthis.com;
    
    location /api/ {
        proxy_pass http://localhost:3000/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    location / {
        return 301 https://cname.vercel-dns.com$request_uri;
    }
}
```

## Notes
- This will keep our API running on the current server while serving the new dashboard from Vercel
- DNS propagation typically takes 5-60 minutes
- The new dashboard is a React application for DID management

Thanks!
