package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import java.util.List;

public class GitHubProfilePage {
    private Page page;
    
    // Real locators extracted from GitHub
    private Locator searchInput;
    private Locator mainAvatarImage;
    private Locator mainAvatarLink;
    private Locator followerAvatars;
    private Locator followersTab;
    
    public GitHubProfilePage(Page page) {
        this.page = page;
        
        // Real locators from GitHub inspection
        this.searchInput = page.locator("input[name='q']");
        this.mainAvatarImage = page.locator("img[alt='View torvalds\\'s full-sized avatar']").first();
        this.mainAvatarLink = page.locator("a:has(img[alt*='full-sized avatar'])");
        this.followerAvatars = page.locator("img[alt^='@']");
        this.followersTab = page.locator("a[href*='tab=followers']");
    }
    
    public boolean isSearchInterfaceVisible() {
        return page.locator("input[name='q'], input[type='search']").first().isVisible();
    }
    
    public void searchForUser(String username) {
        page.navigate("https://github.com/" + username);
        page.waitForLoadState();
    }
    
    public boolean isMainAvatarVisible() {
        // Check for avatar image with alt text pattern
        Locator avatar = page.locator("img[alt*='avatar']").first();
        return avatar.isVisible();
    }
    
    public Locator getMainAvatarElement() {
        return page.locator("img[alt*='avatar']").first();
    }
    
    public String getMainAvatarAltText() {
        Locator avatar = page.locator("img[alt*='avatar']").first();
        return avatar.getAttribute("alt");
    }
    
    public void navigateToFollowersTab() {
        followersTab.click();
        page.waitForLoadState();
    }
    
    public int getFollowerAvatarsWithAltTextCount() {
        List<Locator> avatars = followerAvatars.all();
        int count = 0;
        
        for (Locator avatar : avatars) {
            String altText = avatar.getAttribute("alt");
            if (altText != null && !altText.trim().isEmpty()) {
                count++;
            }
        }
        
        return count;
    }
    
    public int getTotalFollowerAvatarsCount() {
        return followerAvatars.count();
    }
    
    public boolean validateAvatarAltTextFormat(String altText) {
        // Validates that alt text follows GitHub pattern: @username or descriptive text
        return altText.startsWith("@") || 
               altText.toLowerCase().contains("avatar") || 
               altText.toLowerCase().contains("view");
    }
    
    public List<String> getAllFollowerAvatarAltTexts() {
        return followerAvatars.all().stream()
            .map(avatar -> avatar.getAttribute("alt"))
            .filter(alt -> alt != null)
            .toList();
    }
}