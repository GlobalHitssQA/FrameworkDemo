package steps;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.GitHubProfilePage;
import static org.junit.jupiter.api.Assertions.*;

public class FollowUserSteps {
    private Page page;
    private GitHubProfilePage profilePage;
    private String initialUrl;
    private int initialTabsCount;

    public FollowUserSteps(Page page) {
        this.page = page;
        this.profilePage = new GitHubProfilePage(page);
    }

    @Given("I navigate to the GitHub profile search component")
    public void navigateToProfileSearchComponent() {
        page.navigate("https://github.com");
        assertTrue(profilePage.isSearchInputVisible(), "Search component should be displayed");
    }

    @When("I enter a valid GitHub username and execute search")
    public void enterUsernameAndSearch() {
        profilePage.searchUser("octocat");
        assertTrue(profilePage.isProfileLoaded(), "User profile should be loaded");
    }

    @And("I locate the Follow button in the user details section")
    public void locateFollowButton() {
        assertTrue(profilePage.isFollowButtonVisible(), "Follow button should be visible");
        assertTrue(profilePage.isFollowButtonEnabled(), "Follow button should be enabled");
    }

    @And("I click the Follow button")
    public void clickFollowButton() {
        initialUrl = page.url();
        initialTabsCount = page.context().pages().size();
        profilePage.clickFollowButton();
    }

    @Then("the system redirects to GitHub external platform")
    public void verifyRedirectionToGitHub() {
        page.waitForTimeout(2000);
        boolean urlChanged = !page.url().equals(initialUrl);
        boolean newTabOpened = page.context().pages().size() > initialTabsCount;
        assertTrue(urlChanged || newTabOpened, "Should redirect or open new tab");
    }

    @And("the external GitHub page opens correctly for follow action")
    public void verifyExternalPageOpens() {
        String currentUrl = page.url();
        if (page.context().pages().size() > initialTabsCount) {
            Page newTab = page.context().pages().get(page.context().pages().size() - 1);
            currentUrl = newTab.url();
        }
        assertTrue(currentUrl.contains("github.com"), "Should navigate to GitHub domain");
    }
}