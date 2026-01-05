package stepdefinitions;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.DashboardPage;
import pages.LoginPage;
import pages.ProspectSearchPage;
import pages.NewProspectPage;
import static org.junit.jupiter.api.Assertions.*;

public class AddNewProspectSteps {
    private Page page;
    private LoginPage loginPage;
    private DashboardPage dashboardPage;
    private ProspectSearchPage prospectSearchPage;
    private NewProspectPage newProspectPage;

    public AddNewProspectSteps(Page page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.prospectSearchPage = new ProspectSearchPage(page);
        this.newProspectPage = new NewProspectPage(page);
    }

    @Given("the advisor is authenticated in Acticenter system")
    public void theAdvisorIsAuthenticatedInActicenterSystem() {
        loginPage.navigateToLogin();
        loginPage.login("advisor@actinver.com", "Password123");
        assertTrue(loginPage.isLoginSuccessful(), "Advisor should be authenticated");
    }

    @And("the advisor is on the dashboard")
    public void theAdvisorIsOnTheDashboard() {
        assertTrue(dashboardPage.isDashboardVisible(), "Dashboard should be visible");
    }

    @When("the advisor performs a prospect search with no results")
    public void theAdvisorPerformsAProspectSearchWithNoResults() {
        prospectSearchPage.searchProspect("nonexistent@example.com");
        assertTrue(prospectSearchPage.isNoResultsMessageVisible(), "No results message should be displayed");
    }

    @And("the advisor verifies the add new prospect option is available")
    public void theAdvisorVerifiesTheAddNewProspectOptionIsAvailable() {
        assertTrue(prospectSearchPage.isAddNewProspectButtonVisible(), "Add new prospect button should be visible");
    }

    @And("the advisor clicks on the add new prospect button")
    public void theAdvisorClicksOnTheAddNewProspectButton() {
        prospectSearchPage.clickAddNewProspect();
    }

    @Then("the system navigates to the new prospect creation form")
    public void theSystemNavigatesToTheNewProspectCreationForm() {
        String currentUrl = page.url();
        assertTrue(currentUrl.contains("/prospect/new") || currentUrl.contains("/create-prospect"), 
                   "URL should indicate new prospect creation page");
    }

    @And("the new prospect creation interface is displayed")
    public void theNewProspectCreationInterfaceIsDisplayed() {
        assertTrue(newProspectPage.isNewProspectFormVisible(), "New prospect form should be displayed");
        assertTrue(newProspectPage.isFormFieldsVisible(), "Form fields should be visible");
    }
}