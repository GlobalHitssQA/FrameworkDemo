package stepdefinitions;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.SalesforceLoginPage;
import pages.ServiceModificationPage;
import pages.ProspectSearchPage;
import static org.junit.Assert.*;

public class ServiceModificationSteps {
    private Page page;
    private SalesforceLoginPage loginPage;
    private ServiceModificationPage serviceModificationPage;
    private ProspectSearchPage prospectSearchPage;

    public ServiceModificationSteps(Page page) {
        this.page = page;
        this.loginPage = new SalesforceLoginPage(page);
        this.serviceModificationPage = new ServiceModificationPage(page);
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("I have logged into Salesforce with service modification permissions")
    public void iHaveLoggedIntoSalesforceWithServiceModificationPermissions() {
        loginPage.navigateToSalesforce();
        loginPage.login("admin@actinver.com", "password123");
        assertTrue("Login should be successful", loginPage.isLoginSuccessful());
    }

    @When("I navigate to the service modification section for AGAS-71 subtask")
    public void iNavigateToTheServiceModificationSectionForAGAS71Subtask() {
        serviceModificationPage.navigateToServiceModificationSection();
        serviceModificationPage.selectSubtask("AGAS-71");
    }

    @And("I locate the prospect search service configuration")
    public void iLocateTheProspectSearchServiceConfiguration() {
        serviceModificationPage.locateProspectSearchServiceConfig();
    }

    @Then("the current service settings and parameters should be displayed")
    public void theCurrentServiceSettingsAndParametersShouldBeDisplayed() {
        assertTrue("Service settings should be visible", serviceModificationPage.areServiceSettingsVisible());
        assertTrue("Search filters should be displayed", serviceModificationPage.areSearchFiltersVisible());
    }

    @When("I modify the service parameters related to prospect search")
    public void iModifyTheServiceParametersRelatedToProspectSearch() {
        serviceModificationPage.modifySearchFilter("email", "contains");
        serviceModificationPage.modifyFieldMapping("prospect_name", "Name");
    }

    @And("I save the service modifications")
    public void iSaveTheServiceModifications() {
        serviceModificationPage.clickSaveButton();
    }

    @Then("the system should display a confirmation message")
    public void theSystemShouldDisplayAConfirmationMessage() {
        assertTrue("Confirmation message should be displayed", serviceModificationPage.isConfirmationMessageVisible());
        assertEquals("Modifications saved successfully", serviceModificationPage.getConfirmationMessage());
    }

    @And("the modifications should be reflected in the prospect search functionality")
    public void theModificationsShouldBeReflectedInTheProspectSearchFunctionality() {
        prospectSearchPage.navigateToProspectSearch();
        assertTrue("Modified parameters should be applied", prospectSearchPage.areModifiedParametersApplied());
    }

    @When("I perform a prospect search with valid criteria")
    public void iPerformAProspectSearchWithValidCriteria() {
        prospectSearchPage.fillSearchField("test@example.com");
        prospectSearchPage.clickSearchButton();
    }

    @Then("the search results should match the modified service configuration")
    public void theSearchResultsShouldMatchTheModifiedServiceConfiguration() {
        assertTrue("Search results should be displayed", prospectSearchPage.areResultsVisible());
        assertTrue("Results should match modified config", prospectSearchPage.validateResultsMatchConfig());
    }
}