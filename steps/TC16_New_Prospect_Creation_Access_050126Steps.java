package steps;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.DashboardPage;
import pages.ProspectCreationPage;
import static org.junit.Assert.*;

public class ProspectCreationSteps {
    private Page page;
    private DashboardPage dashboardPage;
    private ProspectCreationPage prospectCreationPage;

    public ProspectCreationSteps(Page page) {
        this.page = page;
        this.dashboardPage = new DashboardPage(page);
        this.prospectCreationPage = new ProspectCreationPage(page);
    }

    @Given("I am logged in as an authorized advisor")
    public void iAmLoggedInAsAuthorizedAdvisor() {
        page.navigate("https://actinver.atlassian.net");
        // Login logic would be implemented here or in a separate login step
    }

    @And("I am on the Acticenter dashboard")
    public void iAmOnActicenterDashboard() {
        assertTrue("Dashboard should be visible", dashboardPage.isDashboardVisible());
        assertTrue("All functions should be loaded", dashboardPage.areFunctionsLoaded());
    }

    @When("I locate the new prospect creation option")
    public void iLocateNewProspectCreationOption() {
        assertTrue("New prospect creation option should be visible", 
                   dashboardPage.isNewProspectCreationVisible());
        assertTrue("New prospect creation option should be accessible", 
                   dashboardPage.isNewProspectCreationEnabled());
    }

    @And("I click on the new prospect creation function")
    public void iClickOnNewProspectCreationFunction() {
        dashboardPage.clickNewProspectCreation();
    }

    @Then("I should be navigated to the prospect creation interface")
    public void iShouldBeNavigatedToProspectCreationInterface() {
        assertTrue("Should navigate to prospect creation screen", 
                   prospectCreationPage.isProspectCreationScreenDisplayed());
    }

    @And("the prospect creation form should be visible")
    public void prospectCreationFormShouldBeVisible() {
        assertTrue("Prospect creation form should be visible", 
                   prospectCreationPage.isProspectFormVisible());
    }
}