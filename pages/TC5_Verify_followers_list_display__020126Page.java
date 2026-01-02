package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import java.util.List;

/**
 * Page Object for GitHub User Profile Page
 * Locators: REAL (extracted using Playwright MCP)
 */
public class GitHubProfilePage {

    private Page page;
    
    // Locators - REAL (extracted from GitHub.com using Playwright)
    private Locator userAvatar;
    private Locator fullName;
    private Locator username;
    private Locator followersLink;
    private Locator followingLink;
    private Locator followButton;
    private Locator bioSection;
    private Locator organizationInfo;
    private Locator locationInfo;

    public GitHubProfilePage(Page page) {
        this.page = page;
        // Avatar - using alt text pattern for user avatar
        this.userAvatar = page.locator("img[alt^='View'][alt$='full-sized avatar']");
        // Full name - heading level 1 contains both full name and username
        this.fullName = page.locator("h1[class*='vcard-names'] span[itemprop='name'], h1 span.p-name, h1 [class*='vcard'] span:first-child");
        // Username - typically in a lighter color span within the heading
        this.username = page.locator("h1[class*='vcard-names'] span[itemprop='additionalName'], h1 span.p-nickname, h1 [class*='vcard'] span:last-child");
        // Followers link - real locator extracted from page
        this.followersLink = page.locator("a[href$='?tab=followers']");
        // Following link
        this.followingLink = page.locator("a[href$='?tab=following']");
        // Follow button
        this.followButton = page.locator("a:has-text('Follow'), button:has-text('Follow')").first();
        // Bio section
        this.bioSection = page.locator("div[data-bio-text], div.p-note, [class*='user-profile-bio']");
        // Organization info - using listitem with Organization label
        this.organizationInfo = page.locator("li[itemprop='worksFor'], li:has(svg[class*='octicon-organization'])");
        // Location info - using listitem with location icon
        this.locationInfo = page.locator("li[itemprop='homeLocation'], li:has(svg[class*='octicon-location'])");
    }

    public void navigateToProfile(String username) {
        page.navigate("https://github.com/" + username);
        page.waitForLoadState();
    }

    public boolean isProfileLoaded() {
        return userAvatar.isVisible() || page.locator("img[alt^='@']").first().isVisible();
    }

    public void clickFollowersLink() {
        followersLink.first().click();
        page.waitForLoadState();
    }

    public String getFullName() {
        return fullName.isVisible() ? fullName.textContent().trim() : "";
    }

    public String getUsername() {
        return username.isVisible() ? username.textContent().trim() : "";
    }

    public boolean isFollowButtonVisible() {
        return followButton.isVisible();
    }

    public String getBio() {
        return bioSection.isVisible() ? bioSection.textContent().trim() : "";
    }

    public String getOrganization() {
        return organizationInfo.isVisible() ? organizationInfo.textContent().trim() : "";
    }

    public String getLocation() {
        return locationInfo.isVisible() ? locationInfo.textContent().trim() : "";
    }

    public int getFollowersCount() {
        String text = followersLink.first().textContent();
        return parseCount(text);
    }

    public int getFollowingCount() {
        String text = followingLink.first().textContent();
        return parseCount(text);
    }

    private int parseCount(String text) {
        if (text == null) return 0;
        text = text.replaceAll("[^0-9kKmM.]", "");
        if (text.toLowerCase().contains("k")) {
            return (int) (Double.parseDouble(text.toLowerCase().replace("k", "")) * 1000);
        } else if (text.toLowerCase().contains("m")) {
            return (int) (Double.parseDouble(text.toLowerCase().replace("m", "")) * 1000000);
        }
        try {
            return Integer.parseInt(text);
        } catch (NumberFormatException e) {
            return 0;
        }
    }
}

// ========================================
// FILE: GitHubFollowersPage.java
// ========================================

package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import java.util.List;

/**
 * Page Object for GitHub Followers List Page
 * Locators: REAL (extracted using Playwright MCP from https://github.com/torvalds?tab=followers)
 */
public class GitHubFollowersPage {

    private Page page;

    // Locators - REAL (extracted from GitHub followers page)
    // Each follower entry is contained in a generic div with avatar link, name link, and follow button
    private Locator followerEntries;
    private Locator followerAvatars;
    private Locator followerUsernameLinks;
    private Locator followerProfileLinks;
    private Locator paginationNext;
    private Locator paginationPrevious;

    public GitHubFollowersPage(Page page) {
        this.page = page;
        
        // Follower entries container - each follower row on the followers page
        // Based on real DOM structure: each entry has an avatar link with img, and username link
        this.followerEntries = page.locator("div[class*='d-table']:has(img[alt^='@']), div:has(> a > img[alt^='@'])");
        
        // Follower avatars - images with alt text starting with @
        this.followerAvatars = page.locator("a[href^='/'] > img[alt^='@']");
        
        // Follower username links - links containing username text (pattern: /username)
        // Real structure shows links like: link "Ayoub Adouay aadouay" with /url: /aadouay
        this.followerUsernameLinks = page.locator("a[href^='/']:has(img[alt^='@']), a[data-hovercard-type='user']");
        
        // All profile links - any link pointing to a user profile
        this.followerProfileLinks = page.locator("div[class*='followers'] a[href^='/']:not([href*='login']):not([href*='?']), a:has(img[alt^='@'])");
        
        // Pagination
        this.paginationNext = page.locator("a:has-text('Next')");
        this.paginationPrevious = page.locator("a:has-text('Previous'), div:has-text('Previous')");
    }

    public boolean isFollowersListVisible() {
        // Wait for the page to load and check if follower avatars are visible
        page.waitForLoadState();
        return followerAvatars.first().isVisible();
    }

    public int getFollowerCount() {
        return followerAvatars.count();
    }

    public boolean allFollowersHaveAvatars() {
        int count = followerAvatars.count();
        if (count == 0) return false;
        
        for (int i = 0; i < count; i++) {
            Locator avatar = followerAvatars.nth(i);
            if (!avatar.isVisible()) {
                return false;
            }
            // Verify the avatar has a valid src attribute
            String src = avatar.getAttribute("src");
            if (src == null || src.isEmpty()) {
                return false;
            }
        }
        return true;
    }

    public boolean allFollowersHaveUsernames() {
        // Get all avatar images (each represents a follower)
        int avatarCount = followerAvatars.count();
        if (avatarCount == 0) return false;
        
        // For each avatar, check if the alt text contains a username (starts with @)
        for (int i = 0; i < avatarCount; i++) {
            Locator avatar = followerAvatars.nth(i);
            String altText = avatar.getAttribute("alt");
            if (altText == null || !altText.startsWith("@")) {
                return false;
            }
        }
        return true;
    }

    public boolean allFollowersHaveProfileLinks() {
        int avatarCount = followerAvatars.count();
        if (avatarCount == 0) return false;
        
        // Each avatar is wrapped in a link to the user's profile
        // Check that each avatar's parent link has a valid href
        for (int i = 0; i < avatarCount; i++) {
            Locator avatar = followerAvatars.nth(i);
            // Get the parent anchor element
            Locator parentLink = avatar.locator("xpath=..");
            String href = parentLink.getAttribute("href");
            
            // Verify href is a valid GitHub profile path (starts with /)
            if (href == null || !href.startsWith("/") || href.contains("login")) {
                return false;
            }
        }
        return true;
    }

    public List<String> getFollowerUsernames() {
        return followerAvatars.all().stream()
            .map(avatar -> {
                String alt = avatar.getAttribute("alt");
                return alt != null ? alt.replace("@", "") : "";
            })
            .filter(username -> !username.isEmpty())
            .toList();
    }

    public void clickFollowerByUsername(String username) {
        page.locator("a[href='/" + username + "']").first().click();
        page.waitForLoadState();
    }

    public boolean hasNextPage() {
        return paginationNext.isVisible();
    }

    public void goToNextPage() {
        if (hasNextPage()) {
            paginationNext.click();
            page.waitForLoadState();
        }
    }

    public boolean hasPreviousPage() {
        return paginationPrevious.isVisible() && paginationPrevious.isEnabled();
    }

    public void goToPreviousPage() {
        if (hasPreviousPage()) {
            paginationPrevious.click();
            page.waitForLoadState();
        }
    }
}