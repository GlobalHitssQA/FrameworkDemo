package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.ProspectSearchPage;
import static org.junit.Assert.*;

public class ProspectSearchSteps {
    private Page page;
    private ProspectSearchPage prospectSearchPage;

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("the advisor is logged in to Acticenter")
    public void theAdvisorIsLoggedInToActicenter() {
        prospectSearchPage.navigateToActicenter();
        prospectSearchPage.performLogin();
    }

    @When("the advisor navigates to the prospect search field")
    public void theAdvisorNavigatesToTheProspectSearchField() {
        prospectSearchPage.navigateToProspectSearch();
    }

    @And("the advisor attempts to type alphabetic characters in the search field")
    public void theAdvisorAttemptsToTypeAlphabeticCharactersInTheSearchField() {
        prospectSearchPage.clearSearchField();
        prospectSearchPage.typeInSearchField("abcXYZ");
    }

    @Then("the system should accept alphabetic characters")
    public void theSystemShouldAcceptAlphabeticCharacters() {
        String fieldValue = prospectSearchPage.getSearchFieldValue();
        assertTrue("Alphabetic characters should be present", fieldValue.matches(".*[a-zA-Z].*"));
    }

    @When("the advisor attempts to type numeric characters in the search field")
    public void theAdvisorAttemptsToTypeNumericCharactersInTheSearchField() {
        prospectSearchPage.clearSearchField();
        prospectSearchPage.typeInSearchField("123456");
    }

    @Then("the system should accept numeric characters")
    public void theSystemShouldAcceptNumericCharacters() {
        String fieldValue = prospectSearchPage.getSearchFieldValue();
        assertTrue("Numeric characters should be present", fieldValue.matches(".*[0-9].*"));
    }

    @When("the advisor attempts to type special characters in the search field")
    public void theAdvisorAttemptsToTypeSpecialCharactersInTheSearchField() {
        prospectSearchPage.clearSearchField();
        prospectSearchPage.typeInSearchField("!@#$%^&*()");
    }

    @Then("the system should reject or filter out special characters")
    public void theSystemShouldRejectOrFilterOutSpecialCharacters() {
        String fieldValue = prospectSearchPage.getSearchFieldValue();
        assertFalse("Special characters should not be present", fieldValue.matches(".*[!@#$%^&*()].*"));
    }

    @And("only alphanumeric characters should remain in the search field")
    public void onlyAlphanumericCharactersShouldRemainInTheSearchField() {
        prospectSearchPage.clearSearchField();
        prospectSearchPage.typeInSearchField("abc123!@#XYZ456$%^");
        String fieldValue = prospectSearchPage.getSearchFieldValue();
        assertTrue("Only alphanumeric characters should remain", fieldValue.matches("^[a-zA-Z0-9]*$"));
    }
}