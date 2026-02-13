# Budget-app 💰

**Flow chart**

![Flowchart_of_Budget-app](image.png)

**User fills in there personal information**

START

START LOAD saved data from local storage LOAD categories from JSON DISPLAY budget form DISPLAY existing budget posts UPDATE balance

**User fills in there income and savings information**

WHEN user submits budget form GET amount GET description GET category GET type (income or expense)

    IF amount is not a number OR amount <= 0
        DISPLAY error message
        STOP
    END IF

    CREATE budget post with:
        amount
        description
        category
        type

    ADD budget post to list
    SAVE list to local storage
    UPDATE balance
    DISPLAY updated budget posts

END

**Make a function for the user to be able to delete budget posts**

WHEN user clicks delete button FIND selected budget post REMOVE budget post from list SAVE updated list to local storage UPDATE balance END

**Make function to calculate the balance**

FUNCTION calculateBalance SET total income to 0 SET total expenses to 0

    FOR EACH budget post
        IF post type is income
            ADD amount to total income
        ELSE
            ADD amount to total expenses
        END IF
    END FOR

    SET balance to total income minus total expenses
    RETURN balance

END FUNCTION

**Make it so user can see the total balance in color code**

CALL calculateBalance DISPLAY balance

IF balance >= 0 SET balance color to green ELSE SET balance color to red END IF
