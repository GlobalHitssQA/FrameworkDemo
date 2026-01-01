package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for GitHub User Profile Page
 * Locators: REAL (extracted with Playwright from https://github.com/octocat)
 */
public class GitHubProfilePage {

    private Page page;
    private static final String BASE_URL = "https://github.com";

    // Profile Section Locators - REAL (extracted from live GitHub page)
    private Locator userAvatar;
    private Locator fullName;
    private Locator username;
    private Locator followButton;
    private Locator followersLink;
    private Locator followingLink;
    private Locator organizationLink;
    private Locator locationText;
    private Locator websiteLink;
    private Locator profileSection;

    // Edit controls locators (should not exist for non-owners)
    private Locator editButton;
    private Locator saveButton;
    private Locator editProfileButton;

    public GitHubProfilePage(Page page) {
        this.page = page;
        initializeLocators();
    }

    private void initializeLocators() {
        // REAL locators extracted from GitHub profile page
        this.userAvatar = page.locator("a[href*='avatars.githubusercontent.com'] img");
        this.fullName = page.locator("h1.vcard-names span[itemprop='name'], h1 span.p-name, h1 > span:first-child");
        this.username = page.locator("h1.vcard-names span[itemprop='additionalName'], h1 span.p-nickname, h1 > span:last-child");
        this.followButton = page.locator("a[href*='/login?return_to']:has-text('Follow')");
        this.followersLink = page.locator("a[href*='tab=followers']");
        this.followingLink = page.locator("a[href*='tab=following']");
        this.organizationLink = page.locator("li[itemprop='worksFor'] a, li:has(svg) a[href*='github.com/']:not([href*='tab='])");
        this.locationText = page.locator("li[itemprop='homeLocation'] span, li:has([class*='location']) span");
        this.websiteLink = page.locator("li[itemprop='url'] a, li a[href^='http']:not([href*='github.com'])");
        this.profileSection = page.locator("div.vcard-details, div[itemtype*='Person']");

        // Edit controls - these should NOT exist for users viewing others' profiles
        this.editButton = page.locator("button:has-text('Edit'), button[aria-label*='Edit']");
        this.saveButton = page.locator("button:has-text('Save'), button[type='submit']:has-text('Save')");
        this.editProfileButton = page.locator("a:has-text('Edit profile'), button:has-text('Edit profile')");
    }

    public void navigateToProfile(String username) {
        page.navigate(BASE_URL + "/" + username);
        page.waitForLoadState();
    }

    public boolean isProfileLoaded() {
        return page.locator("h1").first().isVisible();
    }

    public boolean isAvatarVisible() {
        return userAvatar.first().isVisible();
    }

    public boolean isFullNameVisible() {
        return fullName.first().isVisible();
    }

    public boolean isUsernameVisible() {
        return username.first().isVisible();
    }

    public Locator getFullNameLocator() {
        return fullName;
    }

    public Locator getUsernameLocator() {
        return username;
    }

    public Locator getLocationLocator() {
        return locationText;
    }

    public Locator getOrganizationLocator() {
        return organizationLink;
    }

    public boolean isElementEditable(Locator element) {
        if (!element.first().isVisible()) {
            return false;
        }
        String tagName = element.first().evaluate("el => el.tagName").toString().toLowerCase();
        boolean isContentEditable = Boolean.parseBoolean(
            element.first().evaluate("el => el.isContentEditable").toString()
        );
        boolean isInputOrTextarea = tagName.equals("input") || tagName.equals("textarea");
        return isContentEditable || isInputOrTextarea;
    }

    public boolean isEditButtonPresent() {
        return editButton.count() > 0 && editButton.first().isVisible();
    }

    public boolean isSaveButtonPresent() {
        return saveButton.count() > 0 && saveButton.first().isVisible();
    }

    public boolean isEditProfileButtonPresent() {
        return editProfileButton.count() > 0 && editProfileButton.first().isVisible();
    }

    public String getFullNameText() {
        return fullName.first().textContent().trim();
    }

    public String getLocationText() {
        if (locationText.count() > 0 && locationText.first().isVisible()) {
            return locationText.first().textContent().trim();
        }
        return "";
    }

    public void clickOnFullName() {
        fullName.first().click();
    }

    public void clickOnLocation() {
        if (locationText.count() > 0 && locationText.first().isVisible()) {
            locationText.first().click();
        }
    }

    public boolean isInputFieldVisibleInProfileSection() {
        Locator inputs = page.locator("div.vcard-details input:visible, div.vcard-details textarea:visible");
        return inputs.count() > 0;
    }

    public boolean isFollowButtonVisible() {
        return followButton.first().isVisible();
    }

    public boolean isFollowButtonALink() {
        String tagName = followButton.first().evaluate("el => el.tagName").toString().toLowerCase();
        return tagName.equals("a");
    }

    public boolean isFollowersLinkClickable() {
        return followersLink.first().isVisible() && followersLink.first().isEnabled();
    }

    public boolean isFollowingLinkClickable() {
        return followingLink.first().isVisible() && followingLink.first().isEnabled();
    }

    public boolean isOrganizationLinkClickable() {
        if (organizationLink.count() > 0) {
            return organizationLink.first().isVisible() && organizationLink.first().isEnabled();
        }
        return true; // Return true if no organization exists (optional field)
    }

    public boolean isWebsiteLinkClickable() {
        if (websiteLink.count() > 0) {
            return websiteLink.first().isVisible() && websiteLink.first().isEnabled();
        }
        return true; // Return true if no website exists (optional field)
    }
}