package steps;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
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

    @Given("the advisor user is logged in to Acticenter")
    public void theAdvisorUserIsLoggedInToActicenter() {
        page.navigate("https://actinver.atlassian.net");
        loginPage.login("advisor_user", "password");
        assertTrue("Login should be successful", loginPage.isLoginSuccessful());
    }

    @When("the advisor navigates to the prospect search field")
    public void theAdvisorNavigatesToTheProspectSearchField() {
        prospectSearchPage.navigateToProspectSearch();
        assertTrue("Search field should be visible", prospectSearchPage.isSearchFieldVisible());
    }

    @And("the advisor types alphabetic characters {string} in the search field")
    public void theAdvisorTypesAlphabeticCharactersInTheSearchField(String text) {
        prospectSearchPage.clearSearchField();
        prospectSearchPage.typeInSearchField(text);
    }

    @Then("the alphabetic characters should be displayed in the field")
    public void theAlphabeticCharactersShouldBeDisplayedInTheField() {
        String value = prospectSearchPage.getSearchFieldValue();
        assertTrue("Search field should contain alphabetic characters", value.matches("[a-zA-Z]+"));
    }

    @When("the advisor types numeric characters {string} in the search field")
    public void theAdvisorTypesNumericCharactersInTheSearchField(String text) {
        prospectSearchPage.clearSearchField();
        prospectSearchPage.typeInSearchField(text);
    }

    @Then("the numeric characters should be displayed in the field")
    public void theNumericCharactersShouldBeDisplayedInTheField() {
        String value = prospectSearchPage.getSearchFieldValue();
        assertTrue("Search field should contain numeric characters", value.matches("[0-9]+"));
    }

    @When("the advisor types alphanumeric characters {string} in the search field")
    public void theAdvisorTypesAlphanumericCharactersInTheSearchField(String text) {
        prospectSearchPage.clearSearchField();
        prospectSearchPage.typeInSearchField(text);
    }

    @Then("the alphanumeric characters should be displayed in the field")
    public void theAlphanumericCharactersShouldBeDisplayedInTheField() {
        String value = prospectSearchPage.getSearchFieldValue();
        assertTrue("Search field should contain alphanumeric characters", value.matches("[a-zA-Z0-9]+"));
    }

    @And("the system should accept all alphanumeric characters without validation errors")
    public void theSystemShouldAcceptAllAlphanumericCharactersWithoutValidationErrors() {
        assertFalse("No validation error should be displayed", prospectSearchPage.isValidationErrorVisible());
        assertTrue("Search field should be enabled", prospectSearchPage.isSearchFieldEnabled());
    }
}