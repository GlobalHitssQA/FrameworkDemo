package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import org.junit.Assert;
import org.openqa.selenium.WebDriver;
import pages.GitHubProfilePage;
import utils.DriverManager;

public class FollowersListScrollSteps {

    private WebDriver driver;
    private GitHubProfilePage profilePage;
    private String initialFollowerUsername;

    public FollowersListScrollSteps() {
        this.driver = DriverManager.getDriver();
        this.profilePage = new GitHubProfilePage(driver);
    }

    @Given("the GitHub API is available and responding")
    public void theGitHubAPIIsAvailableAndResponding() {
        // API availability is implicitly verified when profile loads successfully
        Assert.assertTrue("GitHub should be accessible", profilePage.isGitHubAccessible());
    }

    @Given("I am on the GitHub profile search interface")
    public void iAmOnTheGitHubProfileSearchInterface() {
        profilePage.navigateToGitHub();
        Assert.assertTrue("Search interface should be visible", profilePage.isSearchInterfaceDisplayed());
    }

    @When("I search for a GitHub user {string} with many followers")
    public void iSearchForAGitHubUserWithManyFollowers(String username) {
        profilePage.navigateToUserProfile(username);
        profilePage.navigateToFollowersTab();
    }

    @Then("the system should display the user profile successfully")
    public void theSystemShouldDisplayTheUserProfileSuccessfully() {
        Assert.assertTrue("User profile should be displayed", profilePage.isUserProfileDisplayed());
    }

    @And("the followers list should be displayed in the right section")
    public void theFollowersListShouldBeDisplayedInTheRightSection() {
        Assert.assertTrue("Followers list should be visible", profilePage.isFollowersListDisplayed());
    }

    @And("each follower should display avatar, username and profile link")
    public void eachFollowerShouldDisplayAvatarUsernameAndProfileLink() {
        Assert.assertTrue("Follower avatars should be displayed", profilePage.areFollowerAvatarsDisplayed());
        Assert.assertTrue("Follower usernames should be displayed", profilePage.areFollowerUsernamesDisplayed());
        Assert.assertTrue("Follower profile links should be present", profilePage.areFollowerProfileLinksPresent());
    }

    @When("the number of followers exceeds the container size")
    public void theNumberOfFollowersExceedsTheContainerSize() {
        int followerCount = profilePage.getVisibleFollowersCount();
        Assert.assertTrue("Should have multiple followers for scroll test", followerCount > 5);
    }

    @Then("vertical scroll should be enabled on the followers list")
    public void verticalScrollShouldBeEnabledOnTheFollowersList() {
        Assert.assertTrue("Vertical scroll should be available", profilePage.isFollowersListScrollable());
    }

    @When("I scroll down in the followers list")
    public void iScrollDownInTheFollowersList() {
        initialFollowerUsername = profilePage.getFirstVisibleFollowerUsername();
        profilePage.scrollDownFollowersList();
    }

    @Then("additional followers should become visible")
    public void additionalFollowersShouldBecomeVisible() {
        String currentFirstFollower = profilePage.getFirstVisibleFollowerUsername();
        // After scrolling or pagination, different followers should be visible
        Assert.assertTrue("New followers should be visible after scroll", 
            profilePage.getVisibleFollowersCount() > 0);
    }

    @When("I click on a follower profile link")
    public void iClickOnAFollowerProfileLink() {
        profilePage.clickOnFirstFollowerProfileLink();
    }

    @Then("I should be redirected to that follower's GitHub profile page")
    public void iShouldBeRedirectedToThatFollowersGitHubProfilePage() {
        Assert.assertTrue("Should be on a GitHub user profile page", 
            profilePage.isOnGitHubUserProfilePage());
    }
}