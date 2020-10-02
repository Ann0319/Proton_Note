const contacts = [
    { Name: 'Andy', Emails: ['andy@protonmail.com', 'company@protonmail.com'] },
    { Name: 'Jason', Emails: ['jason@protonmail.com', 'company@protonmail.com'] },
    { Name: 'Bart', Emails: ['bart@protonmail.com'] },
    { Name: 'Richard', Emails: ['richard@protonmail.com'] }
  ];

  function extract(contacts = []) {
    const emails = contacts.reduce((result, current) => [...result, ...current.Emails], [])

    const count = (array) =>
      array.reduce((a, b) => ({
        ...a,
        [b]: (a[b] || 0) + 1
      }), {})

    const duplicates = (data) => Object.keys(data).filter((a) => data[a] > 1)

    const duplicateEmails = duplicates(count(emails))

    return duplicateEmails.reduce((result, current) => {
      const currentContact = []
      contacts.forEach(c => {
        if (c.Emails.indexOf(current) >= 0) {
          currentContact.push(c)
        }
      })
      return {
        ...result,
        [current]: currentContact
      }
    }, {})
  }

  console.log(extract(contacts));

  /*
  {
    'company@protonmail.com': [  
        { Name: 'Andy', Emails: ['andy@protonmail.com', 'company@protonmail.com'] },
        { Name: 'Jason', Emails: ['jason@protonmail.com', 'company@protonmail.com'] }
      ]
  }
  */