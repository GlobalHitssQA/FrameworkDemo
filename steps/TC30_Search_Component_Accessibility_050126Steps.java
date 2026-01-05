package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import pages.GitHubSearchPage;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserType;
import com.microsoft.playwright.Playwright;
import static org.junit.jupiter.api.Assertions.*;

public class SearchAccessibilitySteps {
    private Playwright playwright;
    private Browser browser;
    private Page page;
    private GitHubSearchPage searchPage;
    
    @Given("the user navigates to GitHub homepage")
    public void navigateToGitHub() {
        playwright = Playwright.create();
        browser = playwright.chromium().launch(new BrowserType.LaunchOptions().setHeadless(false));
        page = browser.newPage();
        searchPage = new GitHubSearchPage(page);
        searchPage.navigate();
    }
    
    @When("the user inspects the search input field HTML")
    public void inspectSearchInput() {
        searchPage.inspectSearchInput();
    }
    
    @Then("the search input should have appropriate ARIA labels or label elements")
    public void verifySearchInputAriaLabels() {
        assertTrue(searchPage.hasSearchInputAriaLabel(), 
            "Search input should have aria-label, aria-labelledby, or associated label element");
    }
    
    @When("the user inspects the search button HTML")
    public void inspectSearchButton() {
        searchPage.inspectSearchButton();
    }
    
    @Then("the search button should have accessible name for screen readers")
    public void verifySearchButtonAccessibleName() {
        assertTrue(searchPage.hasSearchButtonAccessibleName(), 
            "Search button should have accessible name via aria-label, title, or text content");
    }
    
    @When("the user navigates to search input with keyboard")
    public void navigateToSearchInputWithKeyboard() {
        searchPage.focusSearchInputWithKeyboard();
    }
    
    @Then("the search input should be keyboard accessible with visible focus")
    public void verifySearchInputKeyboardAccessible() {
        assertTrue(searchPage.isSearchInputFocused(), 
            "Search input should be keyboard accessible with visible focus indicator");
    }
    
    @When("the user navigates to search button with keyboard")
    public void navigateToSearchButtonWithKeyboard() {
        searchPage.focusSearchButtonWithKeyboard();
    }
    
    @Then("the search button should be keyboard accessible with visible focus")
    public void verifySearchButtonKeyboardAccessible() {
        assertTrue(searchPage.isSearchButtonFocused(), 
            "Search button should be keyboard accessible with visible focus indicator");
    }
    
    @When("the user performs a search for a valid username")
    public void performSearchForValidUser() {
        searchPage.searchForUsername("torvalds");
    }
    
    @Then("the search component should manage focus properly")
    public void verifyFocusManagement() {
        assertTrue(searchPage.hasFocusManagement(), 
            "Search component should manage focus after submission and results load");
    }
    
    @When("the user searches for a non-existent user")
    public void searchForNonExistentUser() {
        searchPage.clearSearchInput();
        searchPage.searchForUsername("nonexistentuserxyz123456789");
    }
    
    @Then("error messages should be accessible with ARIA live regions")
    public void verifyErrorMessagesAccessibility() {
        assertTrue(searchPage.hasAccessibleErrorMessage(), 
            "Error messages should be announced via ARIA live regions or role alerts");
    }
    
    @When("the user verifies color contrast ratios")
    public void verifyColorContrast() {
        searchPage.checkColorContrast();
    }
    
    @Then("all text should meet WCAG 2.1 AA standards with minimum 4.5:1 contrast")
    public void verifyWCAGContrast() {
        assertTrue(searchPage.meetsWCAGContrastStandards(), 
            "All text in search component should have minimum 4.5:1 contrast ratio");
    }
}