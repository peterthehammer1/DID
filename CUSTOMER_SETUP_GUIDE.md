# Port This DID Setup Guide

## 📞 **Complete Setup Instructions for Your New Phone Number**

Congratulations on purchasing your new DID (Direct Inward Dialing) number! This guide will help you configure your number for immediate use.

---

## 🚀 **Quick Start - Your Number is Ready!**

### **What Happens When You Purchase:**
✅ **Instant Activation**: Your number is immediately active  
✅ **AI Agent Connected**: Pre-configured with Port This AI agent  
✅ **Voice & SMS Enabled**: Ready for calls and text messages  
✅ **Monthly Billing**: $0.50 CAD/month automatically charged  

### **Your Number Details:**
- **Phone Number**: [Your purchased number]
- **AI Agent**: `agent_0cfd3019a03f3f2e7a1e18c867`
- **Monthly Fee**: $0.50 CAD
- **Features**: Voice calls, SMS messaging

---

## ⚙️ **Configuration Options**

### **1. Basic Configuration (Already Done)**
Your number comes pre-configured with:
- **AI-Powered Voice**: Port This AI agent handles incoming calls
- **SMS Messaging**: Text messages are received and can be processed
- **Professional Setup**: Ready for business use immediately

### **2. Advanced Configuration (Optional)**
You can customize your number by going to the **"My Numbers"** tab and clicking **"Configure"**:

#### **Voice Settings:**
- **SIP Forwarding**: Forward calls to your SIP endpoint
- **Webhook Integration**: Send call data to your server
- **Voicemail**: Enable/disable voicemail functionality

#### **SMS Settings:**
- **Webhook URL**: Receive SMS messages at your endpoint
- **Auto-Reply**: Set up automatic responses
- **Custom Messages**: Configure personalized replies

---

## 🔧 **Integration Options**

### **Option 1: Use Port This AI Agent (Recommended)**
**Perfect for**: Customer service, lead generation, appointment booking

**What you get:**
- AI-powered call handling
- Natural conversation flow
- Lead capture and qualification
- Appointment scheduling
- Information collection

**Setup**: Already configured! Your number is ready to use.

### **Option 2: Custom SIP Integration**
**Perfect for**: Existing phone systems, PBX integration

**Setup Steps:**
1. Go to **"My Numbers"** → **"Configure"**
2. Enable **"Voice Settings"**
3. Enter your SIP endpoint: `sip:user@your-domain.com`
4. Save configuration

**Example SIP Endpoints:**
```
sip:extension@yourpbx.com
sip:1001@192.168.1.100
sip:user@voip-provider.com
```

### **Option 3: Webhook Integration**
**Perfect for**: Custom applications, CRM integration

**Setup Steps:**
1. Go to **"My Numbers"** → **"Configure"**
2. Enable **"Voice Settings"**
3. Enter webhook URL: `https://your-domain.com/voice-webhook`
4. Save configuration

**Webhook Payload Example:**
```json
{
  "call_uuid": "abc-123-def",
  "direction": "inbound",
  "caller_id": "6047778888",
  "called_number": "7782440122",
  "start_time": "2025-10-10T12:00:00Z"
}
```

---

## 📱 **SMS Configuration**

### **Receive SMS Messages**
Your number can receive text messages. Configure where they should be sent:

**Webhook URL**: `https://your-domain.com/sms-webhook`

**SMS Webhook Payload:**
```json
{
  "message_uuid": "msg-123-456",
  "from": "6047778888",
  "to": "7782440122",
  "body": "Hello, I'm interested in your services",
  "timestamp": "2025-10-10T12:00:00Z"
}
```

### **Auto-Reply Setup**
Enable automatic responses to incoming SMS:

1. Go to **"My Numbers"** → **"Configure"**
2. Enable **"SMS Settings"**
3. Turn on **"Auto-Reply"**
4. Enter your message: "Thank you for contacting us! We'll respond within 24 hours."

---

## 🧪 **Testing Your Number**

### **Test Incoming Calls:**
1. Call your new number from any phone
2. You should hear the Port This AI agent
3. Test the conversation flow
4. Verify call quality and response

### **Test SMS:**
1. Send a text message to your number
2. Check your webhook endpoint (if configured)
3. Verify auto-reply (if enabled)

### **Test Configuration:**
1. Make configuration changes
2. Test again to ensure changes are applied
3. Check logs for any errors

---

## 💰 **Billing Information**

### **Monthly Charges:**
- **DID Rental**: $0.50 CAD/month per number
- **Call Usage**: Based on duration and destination
- **SMS**: Per message charges apply

### **Payment:**
- Automatic billing to your account
- Balance notifications via email
- Low balance threshold alerts

### **Account Management:**
- View usage in **"My Numbers"** tab
- Check call history and costs
- Download billing statements

---

## 🆘 **Support & Troubleshooting**

### **Common Issues:**

**"Number not working"**
- Check if number is active in dashboard
- Verify configuration settings
- Contact support if issues persist

**"Calls not connecting"**
- Verify SIP endpoint is correct
- Check firewall settings
- Ensure SIP provider is accessible

**"SMS not received"**
- Verify webhook URL is accessible
- Check webhook endpoint logs
- Test with curl: `curl -X POST your-webhook-url`

### **Getting Help:**
- **Email**: support@portthis.com
- **Phone**: [Your support number]
- **Documentation**: [Link to full docs]
- **Status Page**: [Link to status page]

---

## 📋 **Quick Reference**

### **Important URLs:**
- **Dashboard**: https://portthis.com
- **API Documentation**: [Your API docs]
- **Webhook Testing**: [Webhook testing tool]

### **Key Settings:**
- **Customer ID**: 1 (for testing)
- **Default Agent**: `agent_0cfd3019a03f3f2e7a1e18c867`
- **Monthly Fee**: $0.50 CAD
- **Currency**: Canadian Dollar (CAD)

### **Configuration Endpoints:**
- **Voice Webhook**: `https://your-domain.com/voice-webhook`
- **SMS Webhook**: `https://your-domain.com/sms-webhook`
- **SIP Endpoint**: `sip:user@your-domain.com`

---

## ✅ **Next Steps**

1. **Test your number** by calling it
2. **Configure advanced settings** if needed
3. **Set up webhooks** for custom integration
4. **Monitor usage** in your dashboard
5. **Contact support** if you need help

**Your Port This DID is ready to use! 🎉**

---

*This guide covers the most common setup scenarios. For advanced integrations or custom requirements, please contact our support team.*
