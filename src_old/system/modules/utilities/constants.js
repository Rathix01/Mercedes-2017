/**
 * Created by Medibot on 21/07/15.
 */

// When constants are needed by both components and stores, they should be referenced rather than string literals.
// They are collected here for the time being.  In future, may wish to separate these out.
var Constants = {

  apiRoot:      ( window.apiRoot && window.apiRoot.length > 0 ) ? window.apiRoot : "http://test.volo.nz/api/",
  apiAdminRoot: ( window.adminApiRoot && window.adminApiRoot.length > 0 ) ? window.adminApiRoot : "http://test.volo.nz/admin-api/",
  animateChanges: window.animateChanges !== undefined ? window.animateChanges : true,

  Requirements: {
    Types: {
      // These follow server format because the list of types is expected to expand.
      "profile-employer-details": "profile-employer-details",
      "document": "document",
      "promotion-install-app": "promotion-install-app",
      "lockbox-setup": "lockbox-setup",
      "profile-next-of-kin": "profile-next-of-kin"
    },
    Statuses: {
      "new": "new",
      "approved": "approved",
      "rejected": "rejected",
      "error": "error"
    },
    LinkType: {
      policy: "policy",
      claim: "claim"
      // also optionally empty
    }

  },

  Documents: {
    Types: {
      ProofOfIdentity: 'ProofOfIdentity',
      ProofOfIncome: 'ProofOfIncome',
      ProofOfResidency: 'ProofOfResidency'
    }
  },


  Applications: {
    Status: {
      'awaiting-documents': 'awaiting-documents',
      'awaiting-payment': 'awaiting-payment',
      'issued': 'issued'
    }
  },

  Tasks: {
    TaskTypes: {
      FormTask: 'FormTask',
      DocumentRequirementTask: 'DocumentRequirementTask'
    },
    Sources: {
      policy: 'policy',
      claim: 'claim'
    },
    FormTaskSubtypes: {
      CreateLockBoxPassphrase: 'CreateLockBoxPassphrase'
    },
    TaskStatuses: {
      Completed: 'Completed',
      Incomplete: 'Incomplete'
    }
  },

  Passphrase: {
    MinPassphraseLength: 14
  },



  FileUpload: {

    FileStatuses: {
      queued: 'queued',
      uploading: 'uploading',
      uploaded: 'uploaded',
      error: 'error'
    },

    ActionTypes: {
      enqueue:          'enqueue',
      remove:           'remove',
      removeAll:        'removeAll',
      setDescription:   'setDescription',
      uploadStarted:    'uploadStarted',
      fileUploaded:     'fileUploaded',
      fileError:        'fileError',
      afterAll:         'afterAll'
    }
  },

  Admin: {
    Pages: {
      Dashboard: 1,
      ApplicationDetails: 2,
      ClaimDetails: 3
    }
  },
  Forms: {
    FieldTypes: {
      question: 'question',
      group: 'group'
    },
    DataTypes: {
      text: 'text',
      longtext: 'longtext',
      checkbox: 'checkbox',
      date: 'date',
      searchtext: 'searchtext'
    }
  }
}

module.exports = Constants;