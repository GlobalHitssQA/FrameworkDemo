package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.AriaRole;

public class GitHubProfilePage {
    private Page page;
    private Locator searchInput;
    private Locator searchButton;
    private Locator userProfile;
    private Locator followButton;
    private Locator userAvatar;
    private Locator userName;
    private Locator userBio;

    public GitHubProfilePage(Page page) {
        this.page = page;
        // Real locators extracted from GitHub.com
        this.searchInput = page.locator("input[name='q']");
        this.searchButton = page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Search"));
        this.userProfile = page.locator(".js-profile-editable-replace");
        this.followButton = page.locator("[data-hydro-click*='follow']").first();
        this.userAvatar = page.locator("img.avatar-user");
        this.userName = page.locator(".vcard-fullname");
        this.userBio = page.locator("[data-bio-text]");
    }

    public void searchUser(String username) {
        searchInput.fill(username);
        searchInput.press("Enter");
        page.waitForTimeout(1500);
        // Click on the user result if in search results
        Locator userLink = page.locator("a[href='" + username + "']").first();
        if (userLink.isVisible()) {
            userLink.click();
        }
    }

    public boolean isSearchInputVisible() {
        return searchInput.isVisible();
    }

    public boolean isProfileLoaded() {
        page.waitForTimeout(1000);
        return userAvatar.isVisible() || userName.isVisible();
    }

    public boolean isFollowButtonVisible() {
        try {
            return followButton.isVisible();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isFollowButtonEnabled() {
        try {
            return followButton.isEnabled();
        } catch (Exception e) {
            return false;
        }
    }

    public void clickFollowButton() {
        followButton.click();
    }

    public String getUserName() {
        return userName.textContent();
    }

    public String getUserBio() {
        return userBio.textContent();
    }

    public boolean isUserAvatarVisible() {
        return userAvatar.isVisible();
    }
}