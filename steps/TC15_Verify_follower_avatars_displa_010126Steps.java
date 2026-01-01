package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.GitHubProfileSearchPage;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class FollowerAvatarsSteps {

    private Page page;
    private GitHubProfileSearchPage profileSearchPage;

    public FollowerAvatarsSteps(Page page) {
        this.page = page;
        this.profileSearchPage = new GitHubProfileSearchPage(page);
    }

    @Given("the user navigates to the GitHub profile search component")
    public void theUserNavigatesToTheGitHubProfileSearchComponent() {
        profileSearchPage.navigateToSearchPage();
        assertTrue(profileSearchPage.isSearchInterfaceDisplayed(), 
            "Search interface should be displayed");
    }

    @When("the user enters a valid GitHub username with followers in the search input")
    public void theUserEntersAValidGitHubUsernameWithFollowersInTheSearchInput() {
        String usernameWithFollowers = "torvalds";
        profileSearchPage.enterUsername(usernameWithFollowers);
        assertTrue(profileSearchPage.isUsernameEntered(usernameWithFollowers), 
            "Username should be entered correctly");
    }

    @And("the user clicks the search button to load the profile")
    public void theUserClicksTheSearchButtonToLoadTheProfile() {
        profileSearchPage.clickSearchButton();
        profileSearchPage.waitForProfileToLoad();
    }

    @Then("the followers list is displayed in the right section")
    public void theFollowersListIsDisplayedInTheRightSection() {
        assertTrue(profileSearchPage.isFollowersListVisible(), 
            "Followers list should be displayed in the right section");
    }

    @And("each follower entry displays an avatar image")
    public void eachFollowerEntryDisplaysAnAvatarImage() {
        assertTrue(profileSearchPage.allFollowersHaveAvatars(), 
            "Each follower should display an avatar image");
    }

    @And("all avatar images are properly sized and formatted")
    public void allAvatarImagesAreProperlyS_izedAndFormatted() {
        assertTrue(profileSearchPage.areAvatarsProperlyFormatted(), 
            "All avatar images should be properly sized and formatted");
    }
}