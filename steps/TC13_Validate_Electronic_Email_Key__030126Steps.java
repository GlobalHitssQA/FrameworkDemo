package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.LoginPage;
import pages.ProspectSearchPage;
import static org.junit.Assert.*;

public class ProspectEmailKeySteps {
    private Page page;
    private LoginPage loginPage;
    private ProspectSearchPage prospectSearchPage;

    public ProspectEmailKeySteps(Page page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("I am logged into Acticenter with valid advisor credentials")
    public void iAmLoggedIntoActicenterWithValidAdvisorCredentials() {
        loginPage.navigateToLogin();
        loginPage.login("advisor_user", "advisor_password");
        assertTrue("Login should be successful", loginPage.isLoginSuccessful());
    }

    @When("I access the prospect search screen")
    public void iAccessTheProspectSearchScreen() {
        prospectSearchPage.navigateToProspectSearch();
        assertTrue("Search interface should be displayed", prospectSearchPage.isSearchInterfaceDisplayed());
    }

    @And("I enter at least 2 characters in the search field")
    public void iEnterAtLeastTwoCharactersInTheSearchField() {
        prospectSearchPage.enterSearchText("Jo");
    }

    @And("I execute the search")
    public void iExecuteTheSearch() {
        prospectSearchPage.clickSearchButton();
    }

    @Then("the search returns matching prospects")
    public void theSearchReturnsMatchingProspects() {
        assertTrue("Search results should be displayed", prospectSearchPage.hasSearchResults());
    }

    @And("each prospect entry displays the electronic email key field")
    public void eachProspectEntryDisplaysTheElectronicEmailKeyField() {
        assertTrue("Email key fields should be present", prospectSearchPage.areEmailKeyFieldsPresent());
    }

    @And("the electronic email key is visible and complete for prospects with this information in Salesforce")
    public void theElectronicEmailKeyIsVisibleAndCompleteForProspectsWithThisInformation() {
        assertTrue("Email keys should be visible and valid", prospectSearchPage.validateEmailKeysDisplayed());
    }

    @And("prospects without email keys are handled according to system specifications")
    public void prospectsWithoutEmailKeysAreHandledAccordingToSystemSpecifications() {
        assertTrue("Missing email keys should be handled properly", prospectSearchPage.validateMissingEmailKeyHandling());
    }
}