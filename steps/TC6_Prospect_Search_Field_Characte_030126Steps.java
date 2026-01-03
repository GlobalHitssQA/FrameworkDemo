package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.LoginPage;
import pages.ProspectSearchPage;
import static org.junit.jupiter.api.Assertions.*;

public class ProspectSearchCharacterValidationSteps {
    private Page page;
    private LoginPage loginPage;
    private ProspectSearchPage prospectSearchPage;
    
    public ProspectSearchCharacterValidationSteps(Page page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.prospectSearchPage = new ProspectSearchPage(page);
    }
    
    @Given("I am logged in to Acticenter as a Wealth Management Advisor")
    public void iAmLoggedInToActicenterAsWealthManagementAdvisor() {
        loginPage.navigateToLogin();
        loginPage.login("advisor@actinver.com", "password123");
        assertTrue(loginPage.isLoginSuccessful(), "User should be successfully logged in");
    }
    
    @When("I navigate to the prospect search section")
    public void iNavigateToProspectSearchSection() {
        prospectSearchPage.navigateToProspectSearch();
    }
    
    @Then("the prospect search interface should be displayed")
    public void prospectSearchInterfaceShouldBeDisplayed() {
        assertTrue(prospectSearchPage.isSearchInterfaceVisible(), "Prospect search interface should be displayed");
    }
    
    @When("I enter alphabetic characters in the search field")
    public void iEnterAlphabeticCharactersInSearchField() {
        prospectSearchPage.clearSearchField();
        prospectSearchPage.enterSearchText("abcABC");
    }
    
    @Then("the alphabetic characters should be accepted and displayed")
    public void alphabeticCharactersShouldBeAcceptedAndDisplayed() {
        String searchValue = prospectSearchPage.getSearchFieldValue();
        assertEquals("abcABC", searchValue, "Alphabetic characters should be accepted");
    }
    
    @When("I enter numeric characters in the search field")
    public void iEnterNumericCharactersInSearchField() {
        prospectSearchPage.clearSearchField();
        prospectSearchPage.enterSearchText("123456");
    }
    
    @Then("the numeric characters should be accepted and displayed")
    public void numericCharactersShouldBeAcceptedAndDisplayed() {
        String searchValue = prospectSearchPage.getSearchFieldValue();
        assertEquals("123456", searchValue, "Numeric characters should be accepted");
    }
    
    @When("I attempt to enter special characters in the search field")
    public void iAttemptToEnterSpecialCharactersInSearchField() {
        prospectSearchPage.clearSearchField();
        prospectSearchPage.enterSearchText("@#$%&*");
    }
    
    @Then("the special characters should be rejected and not displayed")
    public void specialCharactersShouldBeRejectedAndNotDisplayed() {
        String searchValue = prospectSearchPage.getSearchFieldValue();
        assertEquals("", searchValue, "Special characters should be rejected");
    }
    
    @And("only alphanumeric characters should be allowed in the search field")
    public void onlyAlphanumericCharactersShouldBeAllowed() {
        prospectSearchPage.clearSearchField();
        prospectSearchPage.enterSearchText("Test123@#$");
        String searchValue = prospectSearchPage.getSearchFieldValue();
        assertEquals("Test123", searchValue, "Only alphanumeric characters should be allowed");
    }
}