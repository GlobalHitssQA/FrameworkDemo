package steps;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import pages.ProspectSearchPage;
import pages.LoginPage;
import static org.junit.jupiter.api.Assertions.*;

public class ProspectSearchSteps {
    private Page page;
    private LoginPage loginPage;
    private ProspectSearchPage prospectSearchPage;

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("the advisor is logged into Acticenter")
    public void theAdvisorIsLoggedIntoActicenter() {
        loginPage.navigateToLogin();
        loginPage.login("advisor@actinver.com", "SecurePassword123");
        assertTrue(loginPage.isLoginSuccessful(), "Advisor login should be successful");
    }

    @When("the advisor navigates to the prospect search section")
    public void theAdvisorNavigatesToTheProspectSearchSection() {
        prospectSearchPage.navigateToProspectSearch();
        assertTrue(prospectSearchPage.isSearchFieldVisible(), "Prospect search field should be visible");
    }

    @When("the advisor enters a non-existent prospect search query")
    public void theAdvisorEntersANonExistentProspectSearchQuery() {
        prospectSearchPage.enterSearchQuery("NONEXISTENT_PROSPECT_999999");
    }

    @When("the advisor executes the search")
    public void theAdvisorExecutesTheSearch() {
        prospectSearchPage.clickSearchButton();
        prospectSearchPage.waitForSearchResults();
    }

    @Then("a no results message should be displayed")
    public void aNoResultsMessageShouldBeDisplayed() {
        assertTrue(prospectSearchPage.isNoResultsMessageVisible(), "No results message should be displayed");
        String expectedMessage = "No se encontraron resultados";
        String actualMessage = prospectSearchPage.getNoResultsMessage();
        assertTrue(actualMessage.contains("No") || actualMessage.contains("no") || actualMessage.contains("resultados"),
                "No results message should indicate no matches found");
    }
}