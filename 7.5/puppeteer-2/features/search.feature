Feature: Tickets test site

    Scenario: Positive - Should book one chair
        Given user is on cinema hall page
        When user selects day "6"
        When user selects hall "1"
        When user selects "1" free chairs
        Then user get the QR with selector "ticket__info-qr"

    Scenario: Positive - Should book several chairs
        Given user is on cinema hall page
        When user selects day "6"
        When user selects hall "1"
        When user selects "3" free chairs
        Then user get the QR and "3" places

    Scenario: Negative - Shouldn't book one chair twice
        Given user is on cinema hall page
        When user selects day "6"
        When user selects hall "1"
        When user selects "1" free chairs
        When user confirms booking
        When user return to cinema hall
        When user selects day "6"
        When user selects hall "1"
        When user selects same chair
        Then user can't book and chair selector is "buying-scheme__chair_taken"