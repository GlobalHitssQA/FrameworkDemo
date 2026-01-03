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
    private int initialResultCount;

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("I access the Acticenter dashboard")
    public void iAccessTheActicenterDashboard() {
        page.navigate("https://actinver.atlassian.net");
    }

    @And("the prospect search field is visible and accessible")
    public void theProspectSearchFieldIsVisibleAndAccessible() {
        assertTrue("Search field should be visible", prospectSearchPage.isSearchFieldVisible());
    }

    @When("I type a single character in the search field")
    public void iTypeASingleCharacterInTheSearchField() {
        prospectSearchPage.clearSearchField();
        prospectSearchPage.typeInSearchField("A");
        page.waitForTimeout(500);
    }

    @Then("the character is accepted but search does not trigger")
    public void theCharacterIsAcceptedButSearchDoesNotTrigger() {
        String searchValue = prospectSearchPage.getSearchFieldValue();
        assertEquals("Search field should contain the character", "A", searchValue);
        assertFalse("Results should not be displayed", prospectSearchPage.areResultsDisplayed());
    }

    @When("I type exactly 2 characters in the search field")
    public void iTypeExactly2CharactersInTheSearchField() {
        prospectSearchPage.clearSearchField();
        prospectSearchPage.typeInSearchField("AB");
        page.waitForTimeout(1000);
    }

    @Then("the search triggers automatically")
    public void theSearchTriggersAutomatically() {
        assertTrue("Search should trigger automatically", prospectSearchPage.areResultsDisplayed());
    }

    @And("the results are displayed with proper Look and Feel formatting")
    public void theResultsAreDisplayedWithProperLookAndFeelFormatting() {
        assertTrue("Results container should be visible", prospectSearchPage.isResultsContainerVisible());
        assertTrue("Results should have proper styling", prospectSearchPage.hasProperResultsFormatting());
    }

    @When("I continue typing additional alphanumeric characters")
    public void iContinueTypingAdditionalAlphanumericCharacters() {
        initialResultCount = prospectSearchPage.getResultsCount();
        prospectSearchPage.typeInSearchField("C123");
        page.waitForTimeout(1000);
    }

    @Then("the search updates dynamically with each character")
    public void theSearchUpdatesDynamicallyWithEachCharacter() {
        int currentResultCount = prospectSearchPage.getResultsCount();
        assertNotEquals("Results should update dynamically", initialResultCount, currentResultCount);
    }

    @And("the proper Look and Feel is maintained")
    public void theProperLookAndFeelIsMaintained() {
        assertTrue("Look and Feel should be maintained", prospectSearchPage.hasProperResultsFormatting());
    }

    @When("I type a long alphanumeric string without reaching any limit")
    public void iTypeALongAlphanumericStringWithoutReachingAnyLimit() {
        prospectSearchPage.clearSearchField();
        String longString = "ABC123XYZ789DEFGHIJKLMNOPQRSTUVWXYZ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        prospectSearchPage.typeInSearchField(longString);
        page.waitForTimeout(1000);
    }

    @Then("the field accepts unlimited alphanumeric characters")
    public void theFieldAcceptsUnlimitedAlphanumericCharacters() {
        String searchValue = prospectSearchPage.getSearchFieldValue();
        assertTrue("Field should accept long strings", searchValue.length() > 50);
    }

    @And("the search continues to function properly")
    public void theSearchContinuesToFunctionProperly() {
        assertTrue("Search should still display results", prospectSearchPage.areResultsDisplayed());
        assertTrue("Results formatting should be maintained", prospectSearchPage.hasProperResultsFormatting());
    }
}