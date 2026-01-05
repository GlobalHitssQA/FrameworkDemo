package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;

public class GitHubProfilePage {
    
    private Page page;
    
    // Locators - Extracted from real GitHub profile page
    private Locator avatar;
    private Locator fullSizedAvatarLink;
    private Locator userName;
    private Locator username;
    private Locator followersLink;
    private Locator followingLink;
    private Locator location;
    private Locator organization;
    private Locator followButton;
    private Locator repositoriesLink;
    private Locator projectsLink;
    private Locator packagesLink;
    private Locator starsLink;
    private Locator pinnedReposSection;
    private Locator contributionGraph;
    private Locator achievementsSection;
    private Locator blockOrReportButton;
    
    public GitHubProfilePage(Page page) {
        this.page = page;
        initializeLocators();
    }
    
    private void initializeLocators() {
        // User profile section - real locators
        this.avatar = page.locator("img[alt*='View'][alt*='full-sized avatar']");
        this.fullSizedAvatarLink = page.locator("a:has-text('View'):has-text('full-sized avatar')");
        this.userName = page.locator("h1 span").first();
        this.username = page.locator("h1 span").nth(1);
        
        // Followers and following - real locators
        this.followersLink = page.locator("a[href*='tab=followers']:has-text('followers')");
        this.followingLink = page.locator("a[href*='tab=following']");
        
        // Profile information - real locators
        this.location = page.locator("li[itemprop='homeLocation'], li:has-text('location:')");
        this.organization = page.locator("li[itemprop='worksFor'], li:has(img):has-text('Foundation')").first();
        
        // Navigation tabs - real locators
        this.repositoriesLink = page.locator("nav a:has-text('Repositories')");
        this.projectsLink = page.locator("nav a:has-text('Projects')");
        this.packagesLink = page.locator("nav a:has-text('Packages')");
        this.starsLink = page.locator("nav a:has-text('Stars')");
        
        // Content sections - real locators
        this.pinnedReposSection = page.locator("h2:has-text('Pinned')");
        this.contributionGraph = page.locator("h2:has-text('contributions in the last year')");
        this.achievementsSection = page.locator("h2:has-text('Achievements')");
        
        // Action buttons - real locators
        this.followButton = page.locator("a:has-text('Follow')").first();
        this.blockOrReportButton = page.locator("button:has-text('Block or Report')");
    }
    
    // Navigation methods
    public void navigateToProfile(String username) {
        page.navigate("https://github.com/" + username);
        page.waitForLoadState();
    }
    
    // Visibility check methods
    public boolean isProfileLoaded() {
        return userName.isVisible() && username.isVisible();
    }
    
    public boolean isAvatarVisible() {
        return avatar.isVisible();
    }
    
    public boolean isUserNameVisible() {
        return userName.isVisible();
    }
    
    public boolean isUsernameVisible() {
        return username.isVisible();
    }
    
    public boolean isFollowersLinkVisible() {
        return followersLink.isVisible();
    }
    
    public boolean isFollowingLinkVisible() {
        return followingLink.isVisible();
    }
    
    public boolean isLocationVisible() {
        return location.isVisible();
    }
    
    public boolean isOrganizationVisible() {
        return organization.isVisible();
    }
    
    public boolean isRepositoriesLinkVisible() {
        return repositoriesLink.isVisible();
    }
    
    public boolean isProjectsLinkVisible() {
        return projectsLink.isVisible();
    }
    
    public boolean isStarsLinkVisible() {
        return starsLink.isVisible();
    }
    
    public boolean isPinnedReposVisible() {
        return pinnedReposSection.isVisible();
    }
    
    public boolean isContributionGraphVisible() {
        return contributionGraph.isVisible();
    }
    
    public boolean isAchievementsSectionVisible() {
        return achievementsSection.isVisible();
    }
    
    // Interaction methods
    public void clickFollowButton() {
        followButton.click();
    }
    
    public void clickFollowersLink() {
        followersLink.click();
    }
    
    public void clickRepositoriesLink() {
        repositoriesLink.click();
    }
    
    // Text retrieval methods
    public String getUserName() {
        return userName.textContent();
    }
    
    public String getUsername() {
        return username.textContent();
    }
    
    public String getFollowersCount() {
        return followersLink.textContent();
    }
    
    public String getFollowingCount() {
        return followingLink.textContent();
    }
    
    public String getLocation() {
        return location.textContent();
    }
}