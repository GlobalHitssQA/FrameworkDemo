package steps;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.LoginPage;
import pages.ProspectSearchPage;
import static org.junit.Assert.*;

public class ProspectSearchSteps {
    private Page page;
    private LoginPage loginPage;
    private ProspectSearchPage prospectSearchPage;
    private int displayedResultsCount;

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("the Bank Advisor is logged into Acticenter")
    public void theBankAdvisorIsLoggedIntoActicenter() {
        loginPage.navigateToLogin();
        loginPage.login("advisor@actinver.com", "password123");
        loginPage.waitForDashboard();
    }

    @And("the Advisor navigates to the prospect search screen")
    public void theAdvisorNavigatesToTheProspectSearchScreen() {
        prospectSearchPage.navigateToProspectSearch();
        prospectSearchPage.waitForSearchScreen();
    }

    @When("the Advisor enters a search term that returns more than 5 results")
    public void theAdvisorEntersASearchTermThatReturnsMoreThan5Results() {
        prospectSearchPage.enterSearchTerm("prospect");
        prospectSearchPage.clickSearchButton();
    }

    @And("the Advisor observes the initially displayed results without scrolling")
    public void theAdvisorObservesTheInitiallyDisplayedResultsWithoutScrolling() {
        prospectSearchPage.waitForSearchResults();
        displayedResultsCount = prospectSearchPage.getVisibleResultsCount();
    }

    @Then("exactly 5 prospect coincidences are displayed on the screen")
    public void exactly5ProspectCoincidencesAreDisplayedOnTheScreen() {
        assertEquals("Expected exactly 5 results to be displayed", 5, displayedResultsCount);
    }

    @And("each of the 5 results shows the prospect name")
    public void eachOfThe5ResultsShowsTheProspectName() {
        for (int i = 0; i < 5; i++) {
            assertTrue("Prospect name should be visible for result " + (i + 1), 
                prospectSearchPage.isProspectNameVisible(i));
            assertFalse("Prospect name should not be empty for result " + (i + 1), 
                prospectSearchPage.getProspectName(i).isEmpty());
        }
    }

    @And("each of the 5 results shows the electronic email")
    public void eachOfThe5ResultsShowsTheElectronicEmail() {
        for (int i = 0; i < 5; i++) {
            assertTrue("Electronic email should be visible for result " + (i + 1), 
                prospectSearchPage.isEmailVisible(i));
            String email = prospectSearchPage.getEmail(i);
            assertFalse("Electronic email should not be empty for result " + (i + 1), 
                email.isEmpty());
            assertTrue("Email should contain @ symbol for result " + (i + 1), 
                email.contains("@"));
        }
    }
}