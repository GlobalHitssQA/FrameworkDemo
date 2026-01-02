package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import com.microsoft.playwright.Page;
import pages.GitHubSearchPage;
import static org.junit.Assert.*;

public class GitHubSearchSteps {
    private Page page;
    private GitHubSearchPage searchPage;

    public GitHubSearchSteps(Page page) {
        this.page = page;
        this.searchPage = new GitHubSearchPage(page);
    }

    @Given("the user navigates to the GitHub Profile Search component")
    public void navigateToGitHubSearchComponent() {
        searchPage.navigateTo("https://github.com");
    }

    @When("the search component is displayed")
    public void searchComponentIsDisplayed() {
        searchPage.waitForComponentToLoad();
    }

    @Then("the input field and search button should be visible")
    public void verifySearchComponentVisible() {
        assertTrue("Input field should be visible", searchPage.isInputFieldVisible());
        assertTrue("Search button should be visible", searchPage.isSearchButtonVisible());
    }

    @When("the user clicks on the search input field")
    public void clickOnSearchInputField() {
        searchPage.clickInputField();
    }

    @Then("the input field should be focused")
    public void verifyInputFieldFocused() {
        assertTrue("Input field should be focused", searchPage.isInputFieldFocused());
    }

    @When("the user types a valid GitHub username {string} into the search input field")
    public void typeValidUsername(String username) {
        searchPage.typeIntoSearchField(username);
    }

    @Then("the entered text {string} should be displayed in the input field")
    public void verifyEnteredText(String expectedText) {
        String actualText = searchPage.getInputFieldValue();
        assertEquals("Input field should contain the entered text", expectedText, actualText);
    }

    @When("the user clears the input field")
    public void clearInputField() {
        searchPage.clearInputField();
    }

    @When("the user enters special characters {string} into the input field")
    public void enterSpecialCharacters(String characters) {
        searchPage.typeIntoSearchField(characters);
    }

    @Then("the input field should accept all character types without errors")
    public void verifySpecialCharactersAccepted() {
        String inputValue = searchPage.getInputFieldValue();
        assertNotNull("Input field should contain value", inputValue);
        assertFalse("Input field should not be empty", inputValue.isEmpty());
    }
}