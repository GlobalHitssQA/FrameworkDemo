package stepdefinitions;

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

    @Given("the user is logged in as an advisor in Acticenter")
    public void theUserIsLoggedInAsAdvisorInActicenter() {
        prospectSearchPage.navigateToActicenter();
        prospectSearchPage.loginAsAdvisor();
    }

    @And("the main dashboard is displayed with prospect search field available")
    public void theMainDashboardIsDisplayedWithProspectSearchFieldAvailable() {
        assertTrue("Dashboard should be visible", prospectSearchPage.isDashboardVisible());
        assertTrue("Prospect search field should be available", prospectSearchPage.isProspectSearchFieldVisible());
    }

    @When("the user clicks on the prospect search field")
    public void theUserClicksOnTheProspectSearchField() {
        prospectSearchPage.clickProspectSearchField();
    }

    @Then("the search field is activated")
    public void theSearchFieldIsActivated() {
        assertTrue("Search field should be activated", prospectSearchPage.isSearchFieldActivated());
    }

    @And("the last 5 recent searches are displayed with prospect name and email address")
    public void theLast5RecentSearchesAreDisplayedWithProspectNameAndEmailAddress() {
        assertTrue("Recent searches section should be visible", prospectSearchPage.isRecentSearchesSectionVisible());
        assertEquals("Should display 5 recent searches", 5, prospectSearchPage.getRecentSearchesCount());
        assertTrue("Each recent search should have name and email", prospectSearchPage.allRecentSearchesHaveNameAndEmail());
    }

    @When("the user types {string} in the search field")
    public void theUserTypesInTheSearchField(String text) {
        prospectSearchPage.typeInSearchField(text);
    }

    @Then("the search is not triggered")
    public void theSearchIsNotTriggered() {
        assertFalse("Search should not be triggered", prospectSearchPage.isSearchTriggered());
    }

    @And("no search results are displayed")
    public void noSearchResultsAreDisplayed() {
        assertFalse("Search results should not be displayed", prospectSearchPage.areSearchResultsDisplayed());
    }

    @And("the recent searches remain visible")
    public void theRecentSearchesRemainVisible() {
        assertTrue("Recent searches should remain visible", prospectSearchPage.isRecentSearchesSectionVisible());
    }

    @When("the user types {string} in the search field making total 2 characters")
    public void theUserTypesInTheSearchFieldMakingTotal2Characters(String text) {
        prospectSearchPage.typeInSearchField(text);
    }

    @Then("the search is not triggered yet")
    public void theSearchIsNotTriggeredYet() {
        assertFalse("Search should not be triggered with 2 characters", prospectSearchPage.isSearchTriggered());
    }

    @When("the user types {string} in the search field making total more than 2 characters")
    public void theUserTypesInTheSearchFieldMakingTotalMoreThan2Characters(String text) {
        prospectSearchPage.typeInSearchField(text);
    }

    @Then("the search is automatically triggered")
    public void theSearchIsAutomaticallyTriggered() {
        assertTrue("Search should be automatically triggered", prospectSearchPage.isSearchTriggered());
    }

    @And("the system queries Salesforce database for matching prospects")
    public void theSystemQueriesSalesforceDatabaseForMatchingProspects() {
        assertTrue("Loading indicator should appear during search", prospectSearchPage.waitForSearchToComplete());
    }

    @When("the user verifies the recent searches section before typing")
    public void theUserVerifiesTheRecentSearchesSectionBeforeTyping() {
        prospectSearchPage.clearSearchField();
        prospectSearchPage.clickProspectSearchField();
    }

    @Then("the system displays the 5 most recent searches with prospect name and email")
    public void theSystemDisplaysThe5MostRecentSearchesWithProspectNameAndEmail() {
        assertEquals("Should display exactly 5 recent searches", 5, prospectSearchPage.getRecentSearchesCount());
        assertTrue("All recent searches should display name", prospectSearchPage.allRecentSearchesHaveName());
        assertTrue("All recent searches should display email", prospectSearchPage.allRecentSearchesHaveEmail());
    }

    @When("the user continues typing additional characters")
    public void theUserContinuesTypingAdditionalCharacters() {
        prospectSearchPage.typeInSearchField("DEF123");
    }

    @Then("the search processes the alphanumeric chain regardless of length")
    public void theSearchProcessesTheAlphanumericChainRegardlessOfLength() {
        assertTrue("Search should process regardless of character length", prospectSearchPage.isSearchTriggered());
        assertTrue("Search results should be displayed", prospectSearchPage.areSearchResultsDisplayed());
    }
}