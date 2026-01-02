package steps;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import pages.ProspectSearchPage;
import static org.junit.jupiter.api.Assertions.*;

public class ProspectSearchSteps {
    private Page page;
    private ProspectSearchPage prospectSearchPage;
    private String longSearchText;

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("the advisor has navigated to the Acticenter dashboard")
    public void navigateToDashboard() {
        page.navigate("https://actinver.atlassian.net");
        assertTrue(prospectSearchPage.isDashboardVisible(), "Dashboard should be displayed");
    }

    @When("the advisor accesses the prospect search functionality")
    public void accessProspectSearch() {
        prospectSearchPage.accessSearchFunctionality();
        assertTrue(prospectSearchPage.isSearchFieldActive(), "Search field should be active and available");
    }

    @When("the advisor types a very long text exceeding typical maximum character limits in the search field")
    public void typeExtendedCharacterInput() {
        longSearchText = "a".repeat(500) + "@verylongprospectname.com";
        prospectSearchPage.fillSearchField(longSearchText);
    }

    @When("the advisor clicks the search button to execute the search")
    public void clickSearchButton() {
        prospectSearchPage.clickSearchButton();
    }

    @Then("the search executes successfully without truncation")
    public void verifySearchExecuted() {
        String enteredValue = prospectSearchPage.getSearchFieldValue();
        assertEquals(longSearchText, enteredValue, "All characters should be accepted without truncation");
    }

    @Then("the search results are displayed based on the entered criteria or a no results message appears")
    public void verifySearchResults() {
        assertTrue(prospectSearchPage.isSearchResultsVisible() || prospectSearchPage.isNoResultsMessageVisible(),
                "Search results or no results message should be displayed");
    }
}