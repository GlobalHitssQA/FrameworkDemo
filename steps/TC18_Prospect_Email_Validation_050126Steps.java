package stepDefinitions;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.ProspectSearchPage;
import static org.junit.Assert.*;
import java.util.List;
import java.util.regex.Pattern;

public class ProspectEmailValidationSteps {
    private Page page;
    private ProspectSearchPage prospectSearchPage;
    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$");

    public ProspectEmailValidationSteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("the user navigates to the prospect search screen")
    public void theUserNavigatesToTheProspectSearchScreen() {
        prospectSearchPage.navigateToProspectSearch();
        assertTrue("Prospect search screen should be visible", prospectSearchPage.isSearchScreenVisible());
    }

    @When("the user performs a search for prospects")
    public void theUserPerformsASearchForProspects() {
        prospectSearchPage.enterSearchTerm("test");
        prospectSearchPage.clickSearchButton();
    }

    @Then("the search results should display a list of prospects")
    public void theSearchResultsShouldDisplayAListOfProspects() {
        assertTrue("Search results list should be visible", prospectSearchPage.isResultsListVisible());
        assertTrue("Search results should contain at least one prospect", prospectSearchPage.getResultsCount() > 0);
    }

    @And("each prospect result should show name and email address")
    public void eachProspectResultShouldShowNameAndEmailAddress() {
        List<String> names = prospectSearchPage.getAllProspectNames();
        List<String> emails = prospectSearchPage.getAllProspectEmails();
        
        assertFalse("Prospect names list should not be empty", names.isEmpty());
        assertFalse("Prospect emails list should not be empty", emails.isEmpty());
        assertEquals("Number of names should match number of emails", names.size(), emails.size());
    }

    @And("all displayed email addresses should follow valid email format")
    public void allDisplayedEmailAddressesShouldFollowValidEmailFormat() {
        List<String> emails = prospectSearchPage.getAllProspectEmails();
        
        for (String email : emails) {
            assertTrue("Email '" + email + "' should match valid email format", 
                      EMAIL_PATTERN.matcher(email.trim()).matches());
        }
    }

    @When("the user searches for a prospect without an email address in Salesforce")
    public void theUserSearchesForAProspectWithoutAnEmailAddressInSalesforce() {
        prospectSearchPage.clearSearchField();
        prospectSearchPage.enterSearchTerm("ProspectWithoutEmail");
        prospectSearchPage.clickSearchButton();
    }

    @Then("the prospect should not appear in the search results")
    public void theProspectShouldNotAppearInTheSearchResults() {
        int resultsCount = prospectSearchPage.getResultsCount();
        assertEquals("Prospects without email should not appear in results", 0, resultsCount);
    }

    @When("the user searches for prospects with email matching specific criteria")
    public void theUserSearchesForProspectsWithEmailMatchingSpecificCriteria() {
        prospectSearchPage.clearSearchField();
        prospectSearchPage.enterSearchTerm("@example.com");
        prospectSearchPage.clickSearchButton();
    }

    @Then("the matching characters in email addresses should be properly highlighted")
    public void theMatchingCharactersInEmailAddressesShouldBeProperlyHighlighted() {
        assertTrue("Highlighted email elements should be present", 
                  prospectSearchPage.areEmailsHighlighted());
    }
}