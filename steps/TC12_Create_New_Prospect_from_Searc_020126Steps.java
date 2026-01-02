package steps;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import pages.DashboardPage;
import pages.ProspectSearchPage;
import pages.NewProspectPage;

public class CreateNewProspectSteps {
    private Page page;
    private DashboardPage dashboardPage;
    private ProspectSearchPage prospectSearchPage;
    private NewProspectPage newProspectPage;

    public CreateNewProspectSteps(Page page) {
        this.page = page;
        this.dashboardPage = new DashboardPage(page);
        this.prospectSearchPage = new ProspectSearchPage(page);
        this.newProspectPage = new NewProspectPage(page);
    }

    @Given("I am logged into the Acticenter dashboard as an advisor")
    public void iAmLoggedIntoTheActicenterDashboardAsAnAdvisor() {
        page.navigate("https://actinver.atlassian.net");
        dashboardPage.waitForDashboardToLoad();
    }

    @When("I access the prospect search functionality")
    public void iAccessTheProspectSearchFunctionality() {
        dashboardPage.accessProspectSearch();
    }

    @When("I perform a prospect search")
    public void iPerformAProspectSearch() {
        prospectSearchPage.enterSearchTerm("test prospect");
        prospectSearchPage.clickSearchButton();
    }

    @When("I identify that no suitable prospect exists in the search results")
    public void iIdentifyThatNoSuitableProspectExistsInTheSearchResults() {
        prospectSearchPage.verifySearchResultsDisplayed();
    }

    @When("I access the option to create a new prospect")
    public void iAccessTheOptionToCreateANewProspect() {
        prospectSearchPage.clickCreateNewProspectLink();
    }

    @Then("the system navigates to the new prospect creation interface")
    public void theSystemNavigatesToTheNewProspectCreationInterface() {
        newProspectPage.verifyNewProspectPageIsDisplayed();
    }
}