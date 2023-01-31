/* eslint-disable cypress/no-unnecessary-waiting */
describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Irmeli Testailija',
      username: 'testIrmeli',
      password: 'salainen',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('shows login form as default', function () {
    cy.contains('Log in to application')
  })

  describe('Login', function () {
    it('succeeds with correct login', function () {
      cy.get('#username').type('testIrmeli')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('Irmeli Testailija logged in')
    })

    it('fails with incorrect password', function () {
      cy.get('#username').type('testIrmeli')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.contains('wrong username or password').as('notification')
      cy.get('@notification').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'testIrmeli', password: 'salainen' })
    })

    it('A blog can be added', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('testTitle')
      cy.get('#author').type('testAuthor')
      cy.get('#url').type('testUrl')
      cy.get('#create-button').click()
      cy.contains('testTitle testAuthor')
    })

    describe('and blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'testTitle',
          author: 'testAuthor',
          url: 'testUrl',
        })
      })

      it('Correct amount of likes after clicking like button', function () {
        cy.contains('view').click()
        cy.get('#like-button').click()
        cy.contains('likes 1')
      })

      it('Blog can be removed by authorized user', function () {
        cy.contains('view').click()
        cy.contains('remove').click()

        cy.get('html').should('not.contain', 'testTitle')
      })

      it('Blog can not be removed by unauthorized user', function () {
        cy.contains('logout').click()

        const user = {
          name: 'Irmeli Testailija 2',
          username: 'testIrmeli2',
          password: 'salainen2',
        }

        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')
        cy.login({ username: 'testIrmeli2', password: 'salainen2' })

        cy.contains('view').click()
        cy.contains('remove').should('not.be.visible')
      })

      it('Sorted descending order by amount of likes', function () {
        cy.createBlog({
          title: 'testTitle2Likes',
          author: 'testAuthor',
          url: 'testUrl',
        })
        cy.contains('testTitle2Likes')
          .contains('view')
          .click()
          .parent()
          .contains('like')
          .as('likeButton2')
        cy.get('@likeButton2').click()
        cy.wait(1000)
        cy.get('@likeButton2').click()
        cy.get('@likeButton2').parent().contains('likes 2')

        cy.createBlog({
          title: 'testTitle4Likes',
          author: 'testAuthor',
          url: 'testUrl',
        })
        cy.contains('testTitle4Likes')
          .contains('view')
          .click()
          .parent()
          .contains('like')
          .as('likeButton4')
        cy.get('@likeButton4').click()
        cy.wait(1000)
        cy.get('@likeButton4').click()
        cy.wait(1000)
        cy.get('@likeButton4').click()
        cy.wait(1000)
        cy.get('@likeButton4').click()
        cy.wait(1000)
        cy.get('@likeButton4').parent().contains('likes 4')

        cy.createBlog({
          title: 'testTitle3Likes',
          author: 'testAuthor',
          url: 'testUrl',
        })
        cy.contains('testTitle3Likes')
          .contains('view')
          .click()
          .parent()
          .contains('like')
          .as('likeButton3')
        cy.get('@likeButton3').click()
        cy.wait(1000)
        cy.get('@likeButton3').click()
        cy.wait(1000)
        cy.get('@likeButton3').click()
        cy.wait(1000)
        cy.get('@likeButton3').parent().contains('likes 3')

        cy.get('button').then((buttons) => {
          cy.wrap(buttons[5]).parent().should('contain', 'likes 4')
          cy.wrap(buttons[8]).parent().should('contain', 'likes 3')
          cy.wrap(buttons[11]).parent().should('contain', 'likes 2')
          cy.wrap(buttons[14]).parent().should('contain', 'likes 0')
        })
      })
    })
  })
})
