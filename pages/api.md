---
layout: default
title: TPEN 3.0 API
permalink: /api/
---

The modular services of TPEN are available via a RESTful API and Web Components, managed in a collection of Open Source repositories.

## Users

User actions include authorization token management, user profile management, and user group management.

### Authorization

Tokens to authenticate users and to authorize access are provided from Auth0 by Okta. 
[The `TPEN-Users` repository](https://github.com/CenterForDigitalHumanities/TPEN-Users/tree/main/auth) contains an auth component that will manage the login and logout process.

```js
<script src="https://{dev.}users.t-pen.org/script/tpen_public_auth.js" type="module"></script>
```

#### Web Component

Whenever a user logs in or out, a `"tpen-authenticated"` Event is broadcasted that can be handled for specific interface modification.

```js
<auth-button class="container">
  <button is="auth-button">login</button>    
</auth-button>
```

The exported `AuthButton` Web Component has a `login()` and `logout()` method that can also be called programmatically.

```js
document.querySelector('auth-button').login()
```

or

```js
import AuthButton from 'https://{dev.}users.t-pen.org/script/tpen_public_auth.js'

LOGOUT_LINK.onclick = AuthButton.logout()
```


| Method | Path | Description |
| ------------ | ------------ | ------------ |
| GET | /api/v1/tokens | List all tokens |
| POST | /api/v1/tokens | Create a new token |
| DELETE | /api/v1/tokens/{token_id} | Delete an existing token |

#### Create a new token

```
POST /api/v1/tokens
```

#### Delete an existing token

```
DELETE /api/v1/tokens/{token_id}
```

#### List all tokens

```
  
`
