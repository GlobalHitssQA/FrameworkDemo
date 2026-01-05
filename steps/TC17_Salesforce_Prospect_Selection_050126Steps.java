package steps;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import pages.LoginPage;
import pages.ProspectSearchPage;
import pages.ProcessSelectionPage;

import static org.junit.Assert.assertTrue;

public class ProspectSelectionSteps {
    private Page page;
    private LoginPage loginPage;
    private ProspectSearchPage prospectSearchPage;
    private ProcessSelectionPage processSelectionPage;
    private String selectedProspectName;

    public ProspectSelectionSteps(Page page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.prospectSearchPage = new ProspectSearchPage(page);
        this.processSelectionPage = new ProcessSelectionPage(page);
    }

    @Given("I am logged into Acticenter as an advisor")
    public void iAmLoggedIntoActicenterAsAnAdvisor() {
        loginPage.navigateTo("https://actinver.atlassian.net");
        loginPage.login("advisor@actinver.com", "password123");
        assertTrue("Dashboard should be visible", loginPage.isDashboardVisible());
    }

    @When("I enter a prospect name in the search field")
    public void iEnterAProspectNameInTheSearchField() {
        selectedProspectName = "John Doe";
        prospectSearchPage.enterProspectName(selectedProspectName);
    }

    @When("I click the search button")
    public void iClickTheSearchButton() {
        prospectSearchPage.clickSearchButton();
    }

    @Then("the search results are displayed")
    public void theSearchResultsAreDisplayed() {
        assertTrue("Search results should be visible", prospectSearchPage.areResultsVisible());
        assertTrue("At least one result should be displayed", prospectSearchPage.getResultsCount() > 0);
    }

    @When("I select a Salesforce prospect from the results list")
    public void iSelectASalesforceProspectFromTheResultsList() {
        prospectSearchPage.selectFirstProspect();
    }

    @Then("the system navigates to the process selection screen")
    public void theSystemNavigatesToTheProcessSelectionScreen() {
        assertTrue("Process selection screen should be visible", processSelectionPage.isProcessSelectionVisible());
    }

    @Then("the selected prospect information is carried forward")
    public void theSelectedProspectInformationIsCarriedForward() {
        String displayedProspectName = processSelectionPage.getSelectedProspectName();
        assertTrue("Selected prospect name should be displayed", displayedProspectName.contains(selectedProspectName));
    }
}