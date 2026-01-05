package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserType;
import com.microsoft.playwright.Playwright;
import pages.GitHubProfileSearchPage;
import org.junit.Assert;

public class InvalidUsernameFormatSteps {
    private Playwright playwright;
    private Browser browser;
    private Page page;
    private GitHubProfileSearchPage searchPage;
    private String invalidUsername = "@#$%invalid";

    @Given("the user navigates to the GitHub profile search component")
    public void navigateToGitHubProfileSearchComponent() {
        playwright = Playwright.create();
        browser = playwright.chromium().launch(new BrowserType.LaunchOptions().setHeadless(false));
        page = browser.newPage();
        page.navigate("https://github.com");
        searchPage = new GitHubProfileSearchPage(page);
    }

    @When("the user enters an invalid username format {string} in the search field")
    public void enterInvalidUsernameFormat(String username) {
        searchPage.enterUsername(username);
    }

    @And("the user clicks the search button")
    public void clickSearchButton() {
        searchPage.clickSearchButton();
    }

    @Then("an error message should be displayed")
    public void verifyErrorMessageIsDisplayed() {
        Assert.assertTrue("Error message should be visible", searchPage.isErrorMessageVisible());
    }

    @And("the error message should indicate the username format is invalid")
    public void verifyErrorMessageIndicatesInvalidFormat() {
        String errorMessage = searchPage.getErrorMessageText();
        Assert.assertTrue("Error message should mention invalid format", 
            errorMessage.toLowerCase().contains("invalid") || 
            errorMessage.toLowerCase().contains("format") ||
            errorMessage.toLowerCase().contains("not found"));
    }

    @And("the error message should provide guidance on valid GitHub username formats")
    public void verifyErrorMessageProvidesGuidance() {
        String errorMessage = searchPage.getErrorMessageText();
        Assert.assertFalse("Error message should not be empty", errorMessage.isEmpty());
        Assert.assertTrue("Error message should contain helpful text", errorMessage.length() > 10);
    }
}