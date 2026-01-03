package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.ProspectSearchPage;
import static org.junit.jupiter.api.Assertions.*;

public class ProspectSearchSteps {
    private Page page;
    private ProspectSearchPage prospectSearchPage;
    private static final String NO_RESULTS_MESSAGE = "Si al hacer una búsqueda y no hay registros se mostrará un mensaje de no resultados";
    
    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ProspectSearchPage(page);
    }
    
    @Given("the advisor user has accessed the Acticenter dashboard")
    public void theAdvisorUserHasAccessedTheActicenterDashboard() {
        prospectSearchPage.navigateToDashboard();
        assertTrue(prospectSearchPage.isDashboardLoaded(), "Dashboard should be loaded successfully");
    }
    
    @And("the search field is available")
    public void theSearchFieldIsAvailable() {
        assertTrue(prospectSearchPage.isSearchFieldVisible(), "Search field should be visible and available");
    }
    
    @When("the user enters a search term with at least 2 characters that has no matching records")
    public void theUserEntersASearchTermWithAtLeastTwoCharactersThatHasNoMatchingRecords() {
        prospectSearchPage.enterSearchTerm("ZZZZZNONEXISTENT99");
    }
    
    @And("the user executes the search")
    public void theUserExecutesTheSearch() {
        prospectSearchPage.clickSearchButton();
        prospectSearchPage.waitForSearchResults();
    }
    
    @Then("the system should display the no results message")
    public void theSystemShouldDisplayTheNoResultsMessage() {
        assertTrue(prospectSearchPage.isNoResultsMessageVisible(), "No results message should be displayed");
        String actualMessage = prospectSearchPage.getNoResultsMessageText();
        assertNotNull(actualMessage, "No results message text should not be null");
        assertFalse(actualMessage.isEmpty(), "No results message should contain text");
    }
    
    @And("the dashboard should remain accessible")
    public void theDashboardShouldRemainAccessible() {
        assertTrue(prospectSearchPage.isDashboardLoaded(), "Dashboard should remain accessible after no results");
    }
    
    @And("the user should be able to perform new searches")
    public void theUserShouldBeAbleToPerformNewSearches() {
        assertTrue(prospectSearchPage.isSearchFieldEnabled(), "Search field should be enabled for new searches");
        assertTrue(prospectSearchPage.isSearchButtonEnabled(), "Search button should be enabled for new searches");
    }
}