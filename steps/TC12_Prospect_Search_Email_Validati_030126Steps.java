package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.DashboardPage;
import pages.ProspectSearchPage;
import static org.junit.jupiter.api.Assertions.*;

public class ProspectSearchSteps {
    private Page page;
    private DashboardPage dashboardPage;
    private ProspectSearchPage prospectSearchPage;

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.dashboardPage = new DashboardPage(page);
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("I am logged into the Acticenter dashboard as an advisor user")
    public void iAmLoggedIntoActicenterDashboard() {
        page.navigate("https://actinver.atlassian.net");
        assertTrue(dashboardPage.isDashboardVisible(), "Dashboard should be displayed successfully");
    }

    @When("I navigate to the prospect search functionality")
    public void iNavigateToProspectSearch() {
        dashboardPage.navigateToProspectSearch();
        assertTrue(prospectSearchPage.isSearchScreenVisible(), "Search screen should be displayed");
    }

    @And("I enter a search term with at least 2 characters")
    public void iEnterSearchTerm() {
        prospectSearchPage.enterSearchTerm("test");
    }

    @And("I perform the search")
    public void iPerformTheSearch() {
        prospectSearchPage.clickSearchButton();
    }

    @Then("the search results should be displayed from Salesforce database")
    public void searchResultsShouldBeDisplayed() {
        assertTrue(prospectSearchPage.areResultsDisplayed(), "Search results should be returned from Salesforce");
    }

    @And("each prospect result should display the electronic email key")
    public void eachProspectShouldDisplayEmailKey() {
        assertTrue(prospectSearchPage.allResultsHaveEmailKey(), "Each result must display electronic email key");
    }

    @And("prospects without email key should not be displayed in the results")
    public void prospectsWithoutEmailKeyShouldNotBeDisplayed() {
        assertTrue(prospectSearchPage.validateNoEmptyEmailKeys(), "Only prospects with valid email key should be shown");
    }
}