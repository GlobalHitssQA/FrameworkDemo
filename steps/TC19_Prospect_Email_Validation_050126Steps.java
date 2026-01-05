package steps;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import pages.ProspectSearchPage;
import static org.junit.Assert.*;

import java.util.List;
import java.util.regex.Pattern;

public class ProspectEmailValidationSteps {
    private Page page;
    private ProspectSearchPage prospectSearchPage;
    private static final Pattern EMAIL_PATTERN = Pattern.compile(
        "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$"
    );

    public ProspectEmailValidationSteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("I am on the prospect search page")
    public void iAmOnTheProspectSearchPage() {
        prospectSearchPage.navigateToProspectSearch();
        assertTrue("Search interface should be accessible", 
                   prospectSearchPage.isSearchInterfaceVisible());
    }

    @When("I enter search criteria to retrieve prospects with email addresses")
    public void iEnterSearchCriteriaToRetrieveProspectsWithEmailAddresses() {
        prospectSearchPage.enterSearchCriteria("email:*");
        prospectSearchPage.clickSearchButton();
        prospectSearchPage.waitForSearchResults();
    }

    @Then("the search results should display prospects with electronic email field")
    public void theSearchResultsShouldDisplayProspectsWithElectronicEmailField() {
        assertTrue("Search results should be displayed", 
                   prospectSearchPage.areResultsDisplayed());
        List<String> emails = prospectSearchPage.getDisplayedEmails();
        assertFalse("At least one prospect with email should be displayed", 
                    emails.isEmpty());
    }

    @Then("prospects without email in Salesforce DB should not be displayed")
    public void prospectsWithoutEmailInSalesforceDBShouldNotBeDisplayed() {
        List<String> prospectNames = prospectSearchPage.getProspectNames();
        for (String name : prospectNames) {
            String email = prospectSearchPage.getEmailForProspect(name);
            assertNotNull("Prospect " + name + " should have an email", email);
            assertFalse("Prospect " + name + " should not have empty email", 
                       email.trim().isEmpty());
        }
    }

    @Then("all displayed email addresses should follow correct format validation")
    public void allDisplayedEmailAddressesShouldFollowCorrectFormatValidation() {
        List<String> emails = prospectSearchPage.getDisplayedEmails();
        for (String email : emails) {
            assertTrue("Email '" + email + "' should follow valid format", 
                      EMAIL_PATTERN.matcher(email).matches());
        }
    }
}