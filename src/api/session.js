import {deprecate} from 'util'

import {InvalidCredential, AlreadyAuthenticated} from '../api-errors'

import {coroutine, wait} from '../fibers-utils'

// ===================================================================

export const signIn = coroutine(function (credentials) {
  if (this.session.has('user_id')) {
    throw new AlreadyAuthenticated()
  }

  const user = wait(this.authenticateUser(credentials))
  if (!user) {
    throw new InvalidCredential()
  }
  this.session.set('user_id', user.get('id'))

  return this.getUserPublicProperties(user)
})

signIn.description = 'sign in'

// -------------------------------------------------------------------

export const signInWithPassword = deprecate(signIn, 'use session.signIn() instead')

signInWithPassword.params = {
  email: { type: 'string' },
  password: { type: 'string' }
}

// -------------------------------------------------------------------

export const signInWithToken = deprecate(signIn, 'use session.signIn() instead')

signInWithToken.params = {
  token: { type: 'string' }
}

// -------------------------------------------------------------------

export function signOut () {
  this.session.unset('user_id')
}

signOut.description = 'sign out the user from the current session'

// This method requires the user to be signed in.
signOut.permission = ''

// -------------------------------------------------------------------

export const getUser = coroutine(function () {
  const userId = this.session.get('user_id')

  return userId === undefined ?
    null :
    this.getUserPublicProperties(wait(this.users.first(userId)))
})

getUser.description = 'return the currently connected user'
