package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class GitHubProfilePage {
    private WebDriver driver;
    private WebDriverWait wait;

    // Locators - Inferidos basados en buenas prácticas y estructura típica de aplicaciones web
    private By searchInput = By.cssSelector("input[data-testid='search-input']");
    private By searchButton = By.cssSelector("button[data-testid='search-button']");
    private By profileContainer = By.cssSelector("div[data-testid='profile-container']");
    private By leftSection = By.cssSelector("div[data-testid='profile-left-section']");
    private By userAvatar = By.cssSelector("img[data-testid='user-avatar']");
    private By fullName = By.cssSelector("h2[data-testid='user-fullname']");
    private By username = By.cssSelector("span[data-testid='username']");
    private By biography = By.cssSelector("p[data-testid='user-bio']");
    private By location = By.cssSelector("span[data-testid='user-location']");
    private By company = By.cssSelector("span[data-testid='user-company']");
    private By website = By.cssSelector("a[data-testid='user-website']");
    private By followButton = By.cssSelector("button[data-testid='follow-button']");
    private By repositoriesCount = By.cssSelector("span[data-testid='repos-count']");
    private By followersCount = By.cssSelector("span[data-testid='followers-count']");
    private By followingCount = By.cssSelector("span[data-testid='following-count']");
    private By gistsCount = By.cssSelector("span[data-testid='gists-count']");

    // Alternative locators (fallback)
    private By searchInputAlt = By.id("user-search");
    private By userAvatarAlt = By.className("user-avatar");
    private By fullNameAlt = By.className("user-name");
    private By usernameAlt = By.className("username");
    private By biographyAlt = By.className("user-bio");
    private By locationAlt = By.className("user-location");
    private By companyAlt = By.className("user-company");
    private By websiteAlt = By.className("user-website");
    private By followButtonAlt = By.className("follow-btn");

    public GitHubProfilePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    public void searchUser(String username) {
        WebElement searchField = wait.until(ExpectedConditions.visibilityOfElementLocated(searchInput));
        searchField.clear();
        searchField.sendKeys(username);
        driver.findElement(searchButton).click();
        wait.until(ExpectedConditions.visibilityOfElementLocated(profileContainer));
    }

    public boolean isProfileVisible() {
        try {
            return wait.until(ExpectedConditions.visibilityOfElementLocated(profileContainer)).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isAvatarDisplayed() {
        try {
            WebElement avatar = wait.until(ExpectedConditions.visibilityOfElementLocated(userAvatar));
            return avatar.isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public String getAvatarSrc() {
        try {
            return driver.findElement(userAvatar).getAttribute("src");
        } catch (Exception e) {
            return null;
        }
    }

    public boolean isFullNameVisible() {
        try {
            return driver.findElement(fullName).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isUsernameVisible() {
        try {
            return driver.findElement(username).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public String getFullName() {
        try {
            return driver.findElement(fullName).getText();
        } catch (Exception e) {
            return "";
        }
    }

    public String getUsername() {
        try {
            return driver.findElement(username).getText();
        } catch (Exception e) {
            return "";
        }
    }

    public String getBiography() {
        try {
            String bioText = driver.findElement(biography).getText();
            return bioText != null ? bioText : "";
        } catch (Exception e) {
            return "";
        }
    }

    public String getLocation() {
        try {
            String locationText = driver.findElement(location).getText();
            return locationText != null ? locationText : "";
        } catch (Exception e) {
            return "";
        }
    }

    public String getCompany() {
        try {
            String companyText = driver.findElement(company).getText();
            return companyText != null ? companyText : "";
        } catch (Exception e) {
            return "";
        }
    }

    public String getWebsite() {
        try {
            String websiteText = driver.findElement(website).getText();
            return websiteText != null ? websiteText : "";
        } catch (Exception e) {
            return "";
        }
    }

    public boolean isFollowButtonVisible() {
        try {
            return driver.findElement(followButton).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isFollowButtonEnabled() {
        try {
            return driver.findElement(followButton).isEnabled();
        } catch (Exception e) {
            return false;
        }
    }

    public void clickFollowButton() {
        driver.findElement(followButton).click();
    }

    public String getRepositoriesCount() {
        try {
            return driver.findElement(repositoriesCount).getText();
        } catch (Exception e) {
            return "0";
        }
    }

    public String getFollowersCount() {
        try {
            return driver.findElement(followersCount).getText();
        } catch (Exception e) {
            return "0";
        }
    }

    public String getFollowingCount() {
        try {
            return driver.findElement(followingCount).getText();
        } catch (Exception e) {
            return "0";
        }
    }

    public String getGistsCount() {
        try {
            return driver.findElement(gistsCount).getText();
        } catch (Exception e) {
            return "0";
        }
    }
}