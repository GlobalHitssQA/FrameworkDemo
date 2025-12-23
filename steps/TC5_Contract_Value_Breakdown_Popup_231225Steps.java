package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import pages.ContractValueBreakdownPage;
import static org.junit.Assert.*;

public class ContractValueBreakdownSteps {
    private WebDriver driver;
    private ContractValueBreakdownPage contractValuePage;
    private String currentBankingSegment;
    private String currentOrientation;

    @Given("the user is authenticated in Acticenter")
    public void theUserIsAuthenticatedInActicenter() {
        ChromeOptions options = new ChromeOptions();
        driver = new ChromeDriver(options);
        contractValuePage = new ContractValueBreakdownPage(driver);
        contractValuePage.navigateToActicenter();
        contractValuePage.login();
    }

    @Given("test contracts are available for Banca Patrimonial, Privada and Wealth Management")
    public void testContractsAreAvailable() {
        assertTrue("Test contracts should be available", contractValuePage.verifyTestContractsAvailable());
    }

    @Given("responsive devices or emulators are configured")
    public void responsiveDevicesAreConfigured() {
        contractValuePage.configureResponsiveEmulation();
    }

    @Given("the user accesses Acticenter in Responsive Landscape view for Banca Patrimonial with Persona Fisica contract")
    public void accessActicenterLandscapeBancaPatrimonialPersonaFisica() {
        contractValuePage.setResponsiveMode("landscape");
        contractValuePage.selectBankingSegment("Banca Patrimonial");
        contractValuePage.selectContractType("Persona Fisica");
        currentBankingSegment = "Banca Patrimonial";
        currentOrientation = "landscape";
    }

    @Given("the user accesses Acticenter in Responsive Landscape view for Banca Privada with Persona Moral contract")
    public void accessActicenterLandscapeBancaPrivadaPersonaMoral() {
        contractValuePage.setResponsiveMode("landscape");
        contractValuePage.selectBankingSegment("Banca Privada");
        contractValuePage.selectContractType("Persona Moral");
        currentBankingSegment = "Banca Privada";
        currentOrientation = "landscape";
    }

    @Given("the user accesses Acticenter in Responsive Landscape view for Wealth Management")
    public void accessActicenterLandscapeWealthManagement() {
        contractValuePage.setResponsiveMode("landscape");
        contractValuePage.selectBankingSegment("Wealth Management");
        currentBankingSegment = "Wealth Management";
        currentOrientation = "landscape";
    }

    @When("the application loads")
    public void theApplicationLoads() {
        contractValuePage.waitForPageLoad();
    }

    @When("the user clicks on the total contract value component")
    public void clickOnTotalContractValueComponent() {
        contractValuePage.clickContractValueComponent();
    }

    @When("the user clicks outside the breakdown component")
    public void clickOutsideBreakdownComponent() {
        contractValuePage.clickOutsidePopup();
    }

    @When("the user changes to Responsive Portrait view for Banca Patrimonial")
    public void changeToPortraitBancaPatrimonial() {
        contractValuePage.setResponsiveMode("portrait");
        currentOrientation = "portrait";
    }

    @When("the user changes to Responsive Portrait view for Banca Privada")
    public void changeToPortraitBancaPrivada() {
        contractValuePage.setResponsiveMode("portrait");
        currentOrientation = "portrait";
    }

    @When("the user changes to Responsive Portrait view for Wealth Management")
    public void changeToPortraitWealthManagement() {
        contractValuePage.setResponsiveMode("portrait");
        currentOrientation = "portrait";
    }

    @Then("the application should display correctly in Landscape mode")
    public void verifyLandscapeMode() {
        assertTrue("Application should display in Landscape mode", contractValuePage.isLandscapeModeActive());
    }

    @Then("the application should display correctly in Landscape mode for Banca Privada")
    public void verifyLandscapeModeBancaPrivada() {
        assertTrue("Application should display in Landscape mode for Banca Privada", contractValuePage.isLandscapeModeActive());
    }

    @Then("the application should display correctly in Landscape mode for Wealth Management")
    public void verifyLandscapeModeWealthManagement() {
        assertTrue("Application should display in Landscape mode for Wealth Management", contractValuePage.isLandscapeModeActive());
    }

    @Then("the contract value breakdown popup should be displayed")
    public void verifyPopupDisplayed() {
        assertTrue("Breakdown popup should be visible", contractValuePage.isBreakdownPopupDisplayed());
    }

    @Then("the popup should close correctly")
    public void verifyPopupClosed() {
        assertFalse("Popup should be closed", contractValuePage.isBreakdownPopupDisplayed());
    }

    @Then("the application should adapt correctly to Portrait mode")
    public void verifyPortraitMode() {
        assertTrue("Application should adapt to Portrait mode", contractValuePage.isPortraitModeActive());
    }

    @Then("the popup should close correctly in all responsive views")
    public void verifyPopupClosedAllViews() {
        assertFalse("Popup should be closed in all responsive views", contractValuePage.isBreakdownPopupDisplayed());
        driver.quit();
    }
}