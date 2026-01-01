package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.GitHubProfileSearchPage;
import static org.junit.Assert.*;

public class GitHubProfileSearchInputSteps {

    private Page page;
    private GitHubProfileSearchPage profileSearchPage;
    private static final String VALID_USERNAME = "octocat";
    private static final String DIFFERENT_USERNAME = "torvalds";

    public GitHubProfileSearchInputSteps(Page page) {
        this.page = page;
        this.profileSearchPage = new GitHubProfileSearchPage(page);
    }

    @Given("the user accesses the GitHub profile search application")
    public void theUserAccessesTheGitHubProfileSearchApplication() {
        profileSearchPage.navigateToApplication();
    }

    @And("the search component is visible on the page")
    public void theSearchComponentIsVisibleOnThePage() {
        assertTrue("Search component should be visible", profileSearchPage.isSearchComponentVisible());
    }

    @When("the user locates the username search input field")
    public void theUserLocatesTheUsernameSearchInputField() {
        assertTrue("Username input field should be present", profileSearchPage.isUsernameInputVisible());
    }

    @Then("the input field should be visible and accessible")
    public void theInputFieldShouldBeVisibleAndAccessible() {
        assertTrue("Input field should be visible", profileSearchPage.isUsernameInputVisible());
        assertTrue("Input field should be enabled", profileSearchPage.isUsernameInputEnabled());
    }

    @When("the user clicks on the input field")
    public void theUserClicksOnTheInputField() {
        profileSearchPage.clickUsernameInput();
    }

    @Then("the input field should receive focus")
    public void theInputFieldShouldReceiveFocus() {
        assertTrue("Input field should be focused", profileSearchPage.isUsernameInputFocused());
    }

    @When("the user types a valid GitHub username into the input field")
    public void theUserTypesAValidGitHubUsernameIntoTheInputField() {
        profileSearchPage.fillUsernameInput(VALID_USERNAME);
    }

    @Then("the entered text should appear in the input field")
    public void theEnteredTextShouldAppearInTheInputField() {
        assertEquals("Entered text should match", VALID_USERNAME, profileSearchPage.getUsernameInputValue());
    }

    @And("the text should remain visible and editable")
    public void theTextShouldRemainVisibleAndEditable() {
        String currentValue = profileSearchPage.getUsernameInputValue();
        assertFalse("Input should contain text", currentValue.isEmpty());
        assertTrue("Input field should be editable", profileSearchPage.isUsernameInputEnabled());
    }

    @When("the user clears the input field")
    public void theUserClearsTheInputField() {
        profileSearchPage.clearUsernameInput();
    }

    @And("the user types different text into the input field")
    public void theUserTypesDifferentTextIntoTheInputField() {
        profileSearchPage.fillUsernameInput(DIFFERENT_USERNAME);
    }

    @Then("the new text should be displayed correctly in the input field")
    public void theNewTextShouldBeDisplayedCorrectlyInTheInputField() {
        assertEquals("New text should be displayed", DIFFERENT_USERNAME, profileSearchPage.getUsernameInputValue());
    }
}