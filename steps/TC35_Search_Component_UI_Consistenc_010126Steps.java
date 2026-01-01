package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserType;
import com.microsoft.playwright.Playwright;
import pages.GitHubSearchPage;
import static org.junit.Assert.*;

public class SearchComponentConsistencySteps {

    private Playwright playwright;
    private Browser browser;
    private Page page;
    private GitHubSearchPage searchPage;
    private String documentedSearchPatterns;
    private boolean mainSearchComponentFound;
    private boolean advancedSearchComponentFound;

    @Given("the user accesses multiple GitHub platform modules with search functionality")
    public void theUserAccessesMultipleGitHubPlatformModulesWithSearchFunctionality() {
        playwright = Playwright.create();
        browser = playwright.chromium().launch();
        page = browser.newPage();
        searchPage = new GitHubSearchPage(page);
        
        // Navigate to main search page
        searchPage.navigateToSearchPage();
        mainSearchComponentFound = searchPage.isSearchInputVisible();
        
        // Navigate to advanced search page
        searchPage.navigateToAdvancedSearchPage();
        advancedSearchComponentFound = searchPage.isAdvancedSearchInputVisible();
    }

    @When("the user identifies the standard search components and documents their design patterns")
    public void theUserIdentifiesTheStandardSearchComponentsAndDocumentsTheirDesignPatterns() {
        documentedSearchPatterns = searchPage.documentSearchPatterns();
    }

    @Then("the standard platform search components are identified and their design patterns are documented")
    public void theStandardPlatformSearchComponentsAreIdentifiedAndTheirDesignPatternsAreDocumented() {
        assertTrue("Main search component should be found", mainSearchComponentFound);
        assertTrue("Advanced search component should be found", advancedSearchComponentFound);
        assertNotNull("Design patterns should be documented", documentedSearchPatterns);
        assertFalse("Design patterns documentation should not be empty", documentedSearchPatterns.isEmpty());
    }

    @And("the user compares the GitHub profile search component layout with platform standards")
    public void theUserComparesTheGitHubProfileSearchComponentLayoutWithPlatformStandards() {
        searchPage.navigateToSearchPage();
        searchPage.compareSearchComponentLayout();
    }

    @Then("the search component uses consistent styling including input field dimensions and button placement")
    public void theSearchComponentUsesConsistentStylingIncludingInputFieldDimensionsAndButtonPlacement() {
        assertTrue("Search input should be visible", searchPage.isSearchInputVisible());
        assertTrue("Search component should have consistent styling", searchPage.hasConsistentStyling());
    }

    @And("the user verifies the search component is positioned in a header location")
    public void theUserVerifiesTheSearchComponentIsPositionedInAHeaderLocation() {
        searchPage.verifySearchComponentPosition();
    }

    @Then("the search component is located in a header position consistent with other platform modules")
    public void theSearchComponentIsLocatedInAHeaderPositionConsistentWithOtherPlatformModules() {
        assertTrue("Search component should be in header position", searchPage.isSearchInHeaderPosition());
    }

    @And("the user checks keyboard shortcuts and enter key behavior and focus states")
    public void theUserChecksKeyboardShortcutsAndEnterKeyBehaviorAndFocusStates() {
        searchPage.testKeyboardInteractions();
    }

    @Then("user interaction behaviors are consistent with other search components across the platform")
    public void userInteractionBehaviorsAreConsistentWithOtherSearchComponentsAcrossThePlatform() {
        assertTrue("Enter key should trigger search", searchPage.isEnterKeyBehaviorConsistent());
        assertTrue("Focus states should be consistent", searchPage.hasFocusStateConsistency());
    }

    @And("the user validates error messages and empty states follow the platform design language")
    public void theUserValidatesErrorMessagesAndEmptyStatesFollowThePlatformDesignLanguage() {
        searchPage.validateErrorMessagesAndEmptyStates();
    }

    @Then("all user feedback messages use the platform standard formatting and tone")
    public void allUserFeedbackMessagesUseThePlatformStandardFormattingAndTone() {
        assertTrue("Error messages should follow platform standards", searchPage.hasStandardErrorFormatting());
        assertTrue("Empty states should follow platform standards", searchPage.hasStandardEmptyStateFormatting());
        
        // Cleanup
        browser.close();
        playwright.close();
    }
}