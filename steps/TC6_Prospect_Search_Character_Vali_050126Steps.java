package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.ProspectSearchPage;
import pages.LoginPage;
import static org.junit.Assert.*;

public class ProspectSearchSteps {
    private Page page;
    private LoginPage loginPage;
    private ProspectSearchPage prospectSearchPage;

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("the advisor is logged in to Acticenter")
    public void theAdvisorIsLoggedInToActicenter() {
        loginPage.navigateToLogin();
        loginPage.login("advisor_username", "advisor_password");
        assertTrue("Login should be successful", loginPage.isLoginSuccessful());
    }

    @And("the advisor is on the prospect search page")
    public void theAdvisorIsOnTheProspectSearchPage() {
        prospectSearchPage.navigateToProspectSearch();
        assertTrue("Prospect search field should be visible", prospectSearchPage.isSearchFieldDisplayed());
    }

    @When("the advisor types {int} character in the search field")
    public void theAdvisorTypesCharacterInTheSearchField(int charCount) {
        String searchText = "A".repeat(charCount);
        prospectSearchPage.enterSearchText(searchText);
    }

    @When("the advisor types {int} characters in the search field")
    public void theAdvisorTypesCharactersInTheSearchField(int charCount) {
        String searchText = "A".repeat(charCount);
        prospectSearchPage.enterSearchText(searchText);
    }

    @And("the advisor clicks the search icon")
    public void theAdvisorClicksTheSearchIcon() {
        prospectSearchPage.clickSearchIcon();
    }

    @Then("the search should not be triggered or system prompts for more characters")
    public void theSearchShouldNotBeTriggeredOrSystemPromptsForMoreCharacters() {
        page.waitForTimeout(1000);
        boolean resultsNotDisplayed = !prospectSearchPage.areResultsDisplayed();
        boolean validationMessageDisplayed = prospectSearchPage.isValidationMessageDisplayed();
        assertTrue("Search should not execute or show validation message", 
                   resultsNotDisplayed || validationMessageDisplayed);
    }

    @When("the advisor clears the search field")
    public void theAdvisorClearsTheSearchField() {
        prospectSearchPage.clearSearchField();
    }

    @And("the advisor presses the enter key")
    public void theAdvisorPressesTheEnterKey() {
        prospectSearchPage.pressEnterKey();
    }

    @Then("the search should be executed and results should be displayed")
    public void theSearchShouldBeExecutedAndResultsShouldBeDisplayed() {
        page.waitForTimeout(2000);
        assertTrue("Search results should be displayed", prospectSearchPage.areResultsDisplayed());
    }
}