package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.AriaRole;

public class GitHubFollowersPage {
    private Page page;
    
    // Locators reales extraídos con Playwright
    private Locator userAvatar;
    private Locator username;
    private Locator followersLink;
    private Locator followersListContainer;
    private Locator followerItems;
    private Locator followButtons;
    private Locator nextButton;
    private Locator mainContent;
    private Locator headerNav;
    
    public GitHubFollowersPage(Page page) {
        this.page = page;
        initializeLocators();
    }
    
    private void initializeLocators() {
        // Locators basados en la inspección real de GitHub
        this.userAvatar = page.locator("img[alt*='@']").first();
        this.username = page.locator("h1").first();
        this.followersLink = page.getByRole(AriaRole.LINK, new Page.GetByRoleOptions().setName("followers"));
        this.followersListContainer = page.locator("main");
        this.followerItems = page.locator("div[data-hpc]");
        this.followButtons = page.locator("a:has-text('Follow')");
        this.nextButton = page.getByRole(AriaRole.LINK, new Page.GetByRoleOptions().setName("Next"));
        this.mainContent = page.locator("main");
        this.headerNav = page.locator("banner");
    }
    
    public void navigateToGitHub() {
        page.navigate("https://github.com");
    }
    
    public void searchUserByDirectURL(String username) {
        page.navigate("https://github.com/" + username);
    }
    
    public void clickFollowersLink() {
        followersLink.click();
        page.waitForLoadState();
    }
    
    public boolean isUserProfileVisible() {
        return userAvatar.isVisible() && username.isVisible();
    }
    
    public boolean isFollowersCountVisible() {
        return followersLink.isVisible();
    }
    
    public boolean isFollowersListVisible() {
        return followersListContainer.isVisible();
    }
    
    public boolean hasFollowerAvatar(int index) {
        Locator follower = followerItems.nth(index);
        return follower.locator("img").first().isVisible();
    }
    
    public boolean hasFollowerUsername(int index) {
        Locator follower = followerItems.nth(index);
        return follower.locator("a").first().isVisible();
    }
    
    public boolean hasFollowerProfileLink(int index) {
        Locator follower = followerItems.nth(index);
        String href = follower.locator("a").first().getAttribute("href");
        return href != null && href.startsWith("/");
    }
    
    public boolean isFollowersListVerticallyAligned() {
        // Verificar que los elementos están apilados verticalmente
        int count = followerItems.count();
        if (count < 2) return false;
        
        double firstY = followerItems.nth(0).boundingBox().y;
        double secondY = followerItems.nth(1).boundingBox().y;
        
        return secondY > firstY;
    }
    
    public int getVisibleFollowersCount() {
        return followerItems.count();
    }
    
    public int getScrollPosition() {
        return (int) page.evaluate("window.pageYOffset");
    }
    
    public void scrollFollowersList(int pixels) {
        page.evaluate("window.scrollBy(0, " + pixels + ")");
        page.waitForTimeout(500);
    }
    
    public boolean isHeaderVisible() {
        return headerNav.isVisible();
    }
    
    public String getFollowerUsername(int index) {
        Locator followerLink = followerItems.nth(index).locator("a").first();
        String href = followerLink.getAttribute("href");
        return href.replace("/", "");
    }
    
    public void clickFollowerProfile(int index) {
        followerItems.nth(index).locator("a").first().click();
        page.waitForLoadState();
    }
    
    public String getCurrentURL() {
        return page.url();
    }
    
    public boolean hasNextPageButton() {
        return nextButton.isVisible();
    }
    
    public void clickNextPage() {
        nextButton.click();
        page.waitForLoadState();
    }
}