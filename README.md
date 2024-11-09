
# Webhook Documentation

This document outlines the requirements for webhook data and how to use it.

## Webhook Structure

The webhooks should be triggered with data in the following format:

```json
{
  "comment": {
    "email": "user@example.com",
    "address": "reciever public address",
    "amount": "sol"
  }
}
