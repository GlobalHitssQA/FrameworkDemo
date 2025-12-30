package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.ProspectSearchPage;
import static org.junit.Assert.*;

public class ProspectSearchSteps {

    private Page page;
    private ProspectSearchPage prospectSearchPage;

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("the user is logged into Acticenter as an authorized advisor")
    public void theUserIsLoggedIntoActicenterAsAnAuthorizedAdvisor() {
        prospectSearchPage.navigateToActicenter();
        assertTrue("User should be logged in", prospectSearchPage.isUserLoggedIn());
    }

    @And("the prospect search functionality is enabled")
    public void theProspectSearchFunctionalityIsEnabled() {
        assertTrue("Prospect search should be enabled", prospectSearchPage.isProspectSearchEnabled());
    }

    @When("the user navigates to the prospect search field in the dashboard")
    public void theUserNavigatesToTheProspectSearchFieldInTheDashboard() {
        prospectSearchPage.navigateToDashboard();
    }

    @Then("the search field is displayed and ready for input")
    public void theSearchFieldIsDisplayedAndReadyForInput() {
        assertTrue("Search field should be visible", prospectSearchPage.isSearchFieldVisible());
        assertTrue("Search field should be enabled", prospectSearchPage.isSearchFieldEnabled());
    }

    @When("the user enters only 1 character in the search field")
    public void theUserEntersOnly1CharacterInTheSearchField() {
        prospectSearchPage.clearSearchField();
        prospectSearchPage.enterSearchText("A");
    }

    @Then("the search is not triggered and no results are displayed")
    public void theSearchIsNotTriggeredAndNoResultsAreDisplayed() {
        assertFalse("Search results should not be visible with 1 character", 
            prospectSearchPage.areSearchResultsVisible());
    }

    @When("the user enters a second character in the search field")
    public void theUserEntersASecondCharacterInTheSearchField() {
        prospectSearchPage.enterSearchText("AB");
    }

    @Then("the search is automatically triggered")
    public void theSearchIsAutomaticallyTriggered() {
        prospectSearchPage.waitForSearchToTrigger();
        assertTrue("Search should be triggered", prospectSearchPage.isSearchTriggered());
    }

    @And("the system displays up to 5 prospect results with name and email")
    public void theSystemDisplaysUpTo5ProspectResultsWithNameAndEmail() {
        assertTrue("Search results should be visible", prospectSearchPage.areSearchResultsVisible());
        int resultCount = prospectSearchPage.getSearchResultsCount();
        assertTrue("Results count should be between 0 and 5", resultCount >= 0 && resultCount <= 5);
        if (resultCount > 0) {
            assertTrue("Prospect name should be displayed", prospectSearchPage.isProspectNameDisplayed());
            assertTrue("Prospect email should be displayed", prospectSearchPage.isProspectEmailDisplayed());
        }
    }

    @When("the user continues typing additional characters")
    public void theUserContinuesTypingAdditionalCharacters() {
        prospectSearchPage.enterSearchText("ABC");
    }

    @Then("the search results are updated dynamically in real-time")
    public void theSearchResultsAreUpdatedDynamicallyInRealTime() {
        prospectSearchPage.waitForSearchResultsToUpdate();
        assertTrue("Search results should update dynamically", 
            prospectSearchPage.areSearchResultsVisible());
    }
}