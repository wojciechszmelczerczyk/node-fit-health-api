# Get chatbot response

## Description

Get chatbot response.

<b>URL:</b> `/message`

<b>Method:</b> `POST`

<b>Authorized:</b> `YES`

## Data constraints

```json
{
  "prompt": "[string]"
}
```

## Data example

```json
{
  "prompt": "How to lose weight?"
}
```

## Success Response

Code: `200 OK`

Condition: If provided data is correct.

### Context example

```json
{
  "res": "Best way to lose weight is cut calories"
}
```

## Error Response

Code: `400 BAD REQUEST`

Condition: If no title provided.

```json
{ "err": "Error", "fail": true }
```
