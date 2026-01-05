package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.AriaRole;

public class GitHubProfilePage {
    private Page page;
    
    // Real locators extracted from GitHub profile page
    private Locator repositoriesLink;
    private Locator repositoryCountBadge;
    private Locator followersLink;
    private Locator followingLink;
    private Locator userAvatar;
    private Locator userName;
    private Locator userHandle;
    
    public GitHubProfilePage(Page page) {
        this.page = page;
        // Using real locators from GitHub's profile page
        // Repository link in navigation with text "Repositories" and count badge
        this.repositoriesLink = page.getByRole(AriaRole.LINK, new Page.GetByRoleOptions().setName(java.util.regex.Pattern.compile("Repositories.*")));
        // Repository count is displayed as a badge next to "Repositories"
        this.repositoryCountBadge = page.locator("a[href*='tab=repositories'] span[class*='Counter']");
        // Followers link showing follower count
        this.followersLink = page.getByRole(AriaRole.LINK, new Page.GetByRoleOptions().setName(java.util.regex.Pattern.compile(".*followers")));
        // Following link
        this.followingLink = page.getByRole(AriaRole.LINK, new Page.GetByRoleOptions().setName(java.util.regex.Pattern.compile(".*following")));
        // User avatar image
        this.userAvatar = page.locator("img[alt*='@']").first();
        // User full name
        this.userName = page.locator("h1 span").first();
        // User handle/username
        this.userHandle = page.locator("h1 span").nth(1);
    }
    
    public boolean isRepositoryCountVisible() {
        return repositoriesLink.isVisible();
    }
    
    public String getRepositoryCount() {
        // Extract the numeric count from the repositories link
        String fullText = repositoriesLink.textContent();
        // Extract number from text like "Repositories 9"
        String[] parts = fullText.trim().split("\\s+");
        for (String part : parts) {
            if (part.matches("\\d+[kKmM]?")) {
                return part;
            }
        }
        return repositoryCountBadge.textContent().trim();
    }
    
    public String getRepositoryLabel() {
        return repositoriesLink.textContent();
    }
    
    public boolean isFollowersCountVisible() {
        return followersLink.isVisible();
    }
    
    public String getFollowersCount() {
        String fullText = followersLink.textContent();
        // Extract number from text like "270k followers"
        return fullText.replaceAll("[^0-9kKmM]", "");
    }
    
    public String getFollowingCount() {
        String fullText = followingLink.textContent();
        // Extract number from text like "0 following"
        return fullText.replaceAll("[^0-9]", "");
    }
    
    public boolean isUserAvatarVisible() {
        return userAvatar.isVisible();
    }
    
    public String getUserName() {
        return userName.textContent().trim();
    }
    
    public String getUserHandle() {
        return userHandle.textContent().trim();
    }
    
    public void clickRepositoriesTab() {
        repositoriesLink.click();
    }
}