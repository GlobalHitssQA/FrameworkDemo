package stepDefinitions;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.DashboardPage;
import pages.ProspectSearchPage;
import static org.junit.Assert.assertTrue;

public class ProspectSearchSteps {
    private Page page;
    private DashboardPage dashboardPage;
    private ProspectSearchPage prospectSearchPage;

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.dashboardPage = new DashboardPage(page);
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("I am logged into the Acticenter dashboard as an advisor")
    public void iAmLoggedIntoTheActicenterDashboard() {
        dashboardPage.navigateToDashboard();
        assertTrue("Dashboard should be displayed", dashboardPage.isDashboardVisible());
    }

    @When("I navigate to the prospect search functionality")
    public void iNavigateToProspectSearchFunctionality() {
        dashboardPage.navigateToProspectSearch();
        assertTrue("Search screen should be displayed", prospectSearchPage.isSearchScreenVisible());
    }

    @And("I enter a valid search term with at least 2 characters")
    public void iEnterValidSearchTerm() {
        prospectSearchPage.enterSearchTerm("Test");
    }

    @And("I execute the search")
    public void iExecuteTheSearch() {
        prospectSearchPage.clickSearchButton();
    }

    @Then("the search results should be displayed")
    public void theSearchResultsShouldBeDisplayed() {
        assertTrue("Search results should be visible", prospectSearchPage.areResultsVisible());
    }

    @And("each result should display the prospect name")
    public void eachResultShouldDisplayProspectName() {
        assertTrue("Prospect names should be displayed", prospectSearchPage.areProspectNamesDisplayed());
    }
}