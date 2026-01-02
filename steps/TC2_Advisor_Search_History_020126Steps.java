package steps;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.ProspectSearchPage;
import static org.junit.Assert.*;

public class SearchHistorySteps {
    private Page page;
    private ProspectSearchPage prospectSearchPage;
    private String currentAdvisorEmail;

    public SearchHistorySteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("I am logged into Acticenter as an advisor with at least {int} previous searches")
    public void iAmLoggedIntoActicenterAsAdvisorWithPreviousSearches(int searchCount) {
        prospectSearchPage.navigateToActicenter();
        prospectSearchPage.loginAsAdvisor();
        currentAdvisorEmail = prospectSearchPage.getCurrentAdvisorEmail();
        assertTrue("Advisor should be logged in", prospectSearchPage.isAdvisorDashboardVisible());
    }

    @When("I click on the prospect search field")
    public void iClickOnProspectSearchField() {
        prospectSearchPage.clickSearchField();
        assertTrue("Search field should be activated", prospectSearchPage.isSearchFieldActive());
    }

    @And("I type any character in the search field")
    public void iTypeAnyCharacterInSearchField() {
        prospectSearchPage.typeInSearchField("a");
    }

    @Then("a dropdown displays showing the last {int} searches")
    public void aDropdownDisplaysShowingLastSearches(int expectedCount) {
        assertTrue("Search history dropdown should be visible", prospectSearchPage.isSearchHistoryDropdownVisible());
        int actualCount = prospectSearchPage.getSearchHistoryCount();
        assertEquals("Should display exactly " + expectedCount + " searches", expectedCount, actualCount);
    }

    @And("each search shows the prospect name and electronic email")
    public void eachSearchShowsProspectNameAndEmail() {
        assertTrue("All searches should display prospect name", prospectSearchPage.allSearchesHaveProspectName());
        assertTrue("All searches should display email", prospectSearchPage.allSearchesHaveEmail());
    }

    @And("only exactly {int} previous searches are displayed")
    public void onlyExactlyPreviousSearchesAreDisplayed(int expectedCount) {
        int actualCount = prospectSearchPage.getSearchHistoryCount();
        assertEquals("Should show exactly " + expectedCount + " searches, no more, no less", expectedCount, actualCount);
    }

    @And("all displayed searches belong to the current advisor")
    public void allDisplayedSearchesBelongToCurrentAdvisor() {
        assertTrue("All searches should belong to current advisor", 
            prospectSearchPage.allSearchesBelongToAdvisor(currentAdvisorEmail));
    }
}